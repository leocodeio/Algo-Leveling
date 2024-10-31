import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export class FullBoilerplateGenerator {
  problemName: string = "";
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];

  parse(input: string): void {
    const lines = input.split("\n").map((line) => line.trim());
    let currentSection: string | null = null;

    lines.forEach((line) => {
      if (line.startsWith("Problem Name:")) {
        this.problemName = this.extractQuotedValue(line);
      } else if (line.startsWith("Function Name:")) {
        this.functionName = this.extractValue(line);
      } else if (line.startsWith("Input Structure:")) {
        currentSection = "input";
      } else if (line.startsWith("Output Structure:")) {
        currentSection = "output";
      } else if (line.startsWith("Input Field:")) {
        if (currentSection === "input") {
          const field = this.extractField(line);
          if (field) this.inputFields.push(field);
        }
      } else if (line.startsWith("Output Field:")) {
        if (currentSection === "output") {
          const field = this.extractField(line);
          if (field) this.outputFields.push(field);
        }
      }
    });
  }

  extractQuotedValue(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }

  extractValue(line: string): string {
    const match = line.match(/: (\w+)$/);
    return match ? match[1] : "";
  }

  extractField(line: string): { type: string; name: string } | null {
    const match = line.match(/Field: (\w+(?:<\w+>)?) (\w+)$/);
    return match ? { type: match[1], name: match[2] } : null;
  }

  generateBoilerplate(language: string): string {
    switch (language) {
      case "cpp":
        return this.generateCpp();
      case "java":
        return this.generateJava();
      case "javascript":
        return this.generateJs();
      case "rust":
        return this.generateRust();
      default:
        throw new Error(`Language ${language} not supported.`);
    }
  }

  generateCpp(): string {
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field, index) => {
        if (field.type.startsWith("list<")) {
          return `int size_${
            field.name
          };\nstd::istringstream(lines[${index}]) >> size_${
            field.name
          };\n${this.mapTypeToCpp(field.type)} ${field.name}(size_${
            field.name
          });\nfor (int i = 0; i < size_${field.name}; i++) std::cin >> ${
            field.name
          }[i];`;
        } else {
          return `${this.mapTypeToCpp(field.type)} ${
            field.name
          };\nstd::istringstream(lines[${index}]) >> ${field.name};`;
        }
      })
      .join("\n  ");

    const outputType = this.outputFields[0].type;
    const functionCall = `${outputType} result = ${
      this.functionName
    }(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `std::cout << result << std::endl;`;

    return `#include <iostream>
  #include <vector>
  #include <string>
  #include <sstream>
  
  int main() {
    std::vector<std::string> lines; // Assume input is loaded into lines
  
    ${inputReads}
    ${functionCall}
    ${outputWrite}
    return 0;
  }`;
  }

  generateJava(): string {
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `List<${this.mapTypeToJava(field.type)}> ${
            field.name
          } = new ArrayList<>();`;
        } else {
          return `${this.mapTypeToJava(field.type)} ${
            field.name
          } = Integer.parseInt(line.trim());`;
        }
      })
      .join("\n  ");

    const outputType = this.mapTypeToJava(this.outputFields[0].type);
    const functionCall = `${outputType} result = ${
      this.functionName
    }(${this.inputFields.map((field) => field.name).join(", ")});`;
    const outputWrite = `System.out.println(result);`;

    return `
  import java.util.*;
  
  public class Main {
    public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      ${inputReads}
      ${functionCall}
      ${outputWrite}
    }
  }`;
  }

  generateJs(): string {
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `const ${field.name} = input.slice(0, size).map(Number);`;
        } else {
          return `const ${field.name} = parseInt(input.shift());`;
        }
      })
      .join("\n  ");

    const outputType = this.outputFields[0].type;
    const functionCall = `const result = ${this.functionName}(${this.inputFields
      .map((field) => field.name)
      .join(", ")});`;
    const outputWrite = `console.log(result);`;

    return `
  const input = require('fs').readFileSync('/path/to/input.txt', 'utf8').split('\\n');
  ${inputReads}
  ${functionCall}
  ${outputWrite}`;
  }

  generateRust(): string {
    const inputs = this.inputFields
      .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");
    const inputReads = this.inputFields
      .map((field) => {
        if (field.type.startsWith("list<")) {
          return `let ${field.name}: Vec<_> = lines.next().unwrap().split_whitespace().map(|x| x.parse().unwrap()).collect();`;
        } else {
          return `let ${field.name}: ${this.mapTypeToRust(
            field.type
          )} = lines.next().unwrap().parse().unwrap();`;
        }
      })
      .join("\n  ");

    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    const functionCall = `let result = ${this.functionName}(${this.inputFields
      .map((field) => field.name)
      .join(", ")});`;
    const outputWrite = `println!("{}", result);`;

    return `use std::fs::read_to_string;
  use std::io::{self};
  use std::str::Lines;
  
  fn main() -> io::Result<()> {
    let input = read_to_string("/path/to/input.txt")?;
    let mut lines = input.lines();
    ${inputReads}
    ${functionCall}
    ${outputWrite}
    Ok(())
  }`;
  }

  mapTypeToCpp(type: string): string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "std::string";
      case "bool":
        return "bool";
      case "list<int>":
        return "std::vector<int>";
      case "list<float>":
        return "std::vector<float>";
      default:
        return "unknown";
    }
  }

  mapTypeToRust(type: string): string {
    switch (type) {
      case "int":
        return "i32";
      case "float":
        return "f64";
      case "string":
        return "String";
      case "bool":
        return "bool";
      case "list<int>":
        return "Vec<i32>";
      case "list<float>":
        return "Vec<f64>";
      default:
        return "unknown";
    }
  }

  mapTypeToJava(type: string): string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "String";
      case "bool":
        return "boolean";
      case "list<int>":
        return "List<Integer>";
      case "list<float>":
        return "List<Float>";
      default:
        return "unknown";
    }
  }
}

async function generateBoilerplatesForAllProblems(problemsDir: string) {
  try {
    const folders = await fs.promises.readdir(problemsDir);

    for (const folder of folders) {
      const folderPath = path.join(problemsDir, folder);
      const structureFilePath = path.join(folderPath, "Structure.md");
      const parser = new FullBoilerplateGenerator();

      try {
        const structureContent = await fs.promises.readFile(
          structureFilePath,
          "utf8"
        );
        parser.parse(structureContent);

        // Generate boilerplate code for each language
        const languages = ["cpp", "java", "javascript", "rust"];
        for (const language of languages) {
          try {
            const boilerplate = parser.generateBoilerplate(language);
            const fullBoilerplateDir = path.join(
              folderPath,
              "full-boilerplate"
            );
            await fs.promises.mkdir(fullBoilerplateDir, { recursive: true });
            const filePath = path.join(
              fullBoilerplateDir,
              `full-boilerplate.${
                language === "cpp"
                  ? "cpp"
                  : language === "java"
                  ? "java"
                  : language === "rust"
                  ? "rs"
                  : language === "javascript"
                  ? "js"
                  : language === "python"
                  ? "py"
                  : language
              }`
            );
            await fs.promises.writeFile(filePath, boilerplate);
            console.log(`Generated ${filePath}`);
          } catch (err) {
            console.error(
              `Error generating ${language} boilerplate for ${folder}:`,
              err
            );
          }
        }
      } catch (err) {
        console.error(`Failed to process folder ${folder}:`, err);
      }
    }
  } catch (err) {
    console.error("Error reading problems directory:", err);
  }
}

// Call the function to process all problems
generateBoilerplatesForAllProblems(process.env.PROBLEMS_DIR as string);
