import fs from "fs";
import path from "path";

export class ProblemDefinitionParser {
  problemName: string = "";
  functionName: string = "";
  inputFields: { type: string; name: string }[] = [];
  outputFields: { type: string; name: string }[] = [];

  extractQuotedValue(line: string): string {
    const match = line.match(/: "(.*)"$/);
    return match ? match[1] : "";
  }

  extractValue(line: string): string {
    const match = line.match(/: (\w+)$/);
    return match ? match[1] : "";
  }

  extractField(line: string): { type: string; name: string } | null {
    const match = line.match(/Field:\s+(\w+<\w+>|\w+)\s+(\w+)/);
    if (match) {
      return { type: match[1], name: match[2] };
    } else {
      console.error(`Failed to match field line: ${line}`);
      return null;
    }
  }

  // Method to generate boilerplate code for multiple languages
  generateBoilerplate(language: string): string {
    switch (language) {
      case "cpp":
        return this.generateCpp();
      case "c":
        return this.generateC();
      case "python":
        return this.generatePython();
      case "java":
        return this.generateJava();
      case "rust":
        return this.generateRust();
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  generateC(): string {
    if (!this.outputFields.length) throw new Error("No output field defined.");
    const outputType = this.mapTypeToC(this.outputFields[0].type);
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToC(field.type)} ${field.name}`)
      .join(", ");
    return `#include <stdio.h>

${outputType} ${this.functionName}(${inputs}) {
    // TODO: Implement this function
    return result; // Replace 'result' with actual implementation
}

int main() {
    // TODO: Call ${this.functionName} and print the result
    return 0;
}
`;
  }

  generateCpp(): string {
    if (!this.outputFields.length) throw new Error("No output field defined.");
    const outputType = this.mapTypeToCpp(this.outputFields[0].type);
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToCpp(field.type)} ${field.name}`)
      .join(", ");
    return `#include <iostream>
using namespace std;

${outputType} ${this.functionName}(${inputs}) {
    // TODO: Implement this function
    return result; // Replace 'result' with actual implementation
}

int main() {
    // TODO: Call ${this.functionName} and print the result
    return 0;
}
`;
  }

  generatePython(): string {
    const inputs = this.inputFields.map((field) => field.name).join(", ");
    return `def ${this.functionName}(${inputs}):
    # TODO: Implement this function
    return result  # Replace 'result' with actual implementation

if __name__ == "__main__":
    # TODO: Call ${this.functionName} and print the result
    pass
`;
  }

  generateJava(): string {
    if (!this.outputFields.length) throw new Error("No output field defined.");
    const outputType = this.mapTypeToJava(this.outputFields[0].type);
    const inputs = this.inputFields
      .map((field) => `${this.mapTypeToJava(field.type)} ${field.name}`)
      .join(", ");
    return `public class Solution {
    public static ${outputType} ${this.functionName}(${inputs}) {
        // TODO: Implement this function
        return result; // Replace 'result' with actual implementation
    }

    public static void main(String[] args) {
        // TODO: Call ${this.functionName} and print the result
    }
}
`;
  }

  generateRust(): string {
    if (!this.outputFields.length) throw new Error("No output field defined.");
    const outputType = this.mapTypeToRust(this.outputFields[0].type);
    const inputs = this.inputFields
      .map((field) => `${field.name}: ${this.mapTypeToRust(field.type)}`)
      .join(", ");
    return `fn ${this.functionName}(${inputs}) -> ${outputType} {
    // TODO: Implement this function
    result // Replace 'result' with actual implementation
}
`;
  }

  mapTypeToC(type: string): string {
    switch (type) {
      case "int":
        return "int";
      case "float":
        return "float";
      case "string":
        return "char*"; // C doesn't have string type, use char*
      case "bool":
        return "int"; // C uses int for bool
      case "list<int>":
        return "int*"; // Pointer to an array of ints
      case "list<float>":
        return "float*"; // Pointer to an array of floats
      case "list<string>":
        return "char**"; // Pointer to an array of char pointers
      case "list<bool>":
        return "int*"; // Pointer to an array of ints (for bool)
      default:
        return "unknown";
    }
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
      case "list<string>":
        return "std::vector<std::string>";
      case "list<bool>":
        return "std::vector<bool>";
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
      case "list<string>":
        return "List<String>";
      case "list<bool>":
        return "List<Boolean>";
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
      case "list<string>":
        return "Vec<String>";
      case "list<bool>":
        return "Vec<bool>";
      default:
        return "unknown";
    }
  }
}

// Function to generate boilerplate code for each problem folder
async function generateBoilerplatesForAllProblems(problemsDir: string) {
  try {
    const folders = await fs.promises.readdir(problemsDir);

    for (const folder of folders) {
      const folderPath = path.join(problemsDir, folder);
      const structureFilePath = path.join(folderPath, "Structure.md");
      const parser = new ProblemDefinitionParser();

      try {
        // Read Structure.md content
        const structureContent = await fs.promises.readFile(
          structureFilePath,
          "utf8"
        );
        const lines = structureContent.split("\n");

        for (const line of lines) {
          if (line.startsWith("Problem Name:")) {
            parser.problemName = parser.extractQuotedValue(line);
          } else if (line.startsWith("Function Name:")) {
            parser.functionName = parser.extractValue(line);
          } else if (line.startsWith("Input Field:")) {
            const field = parser.extractField(line);
            if (field) {
              parser.inputFields.push(field);
            }
          } else if (line.startsWith("Output Field:")) {
            const field = parser.extractField(line);
            if (field) {
              parser.outputFields.push(field);
            }
          }
        }

        // Generate boilerplate code for each language
        const languages = ["cpp", "c", "python", "java", "rust"];
        for (const language of languages) {
          const boilerplate = parser.generateBoilerplate(language);
          const boilerplateDir = path.join(folderPath, "boilerplate");
          await fs.promises.mkdir(boilerplateDir, { recursive: true });
          const filePath = path.join(
            boilerplateDir,
            `half-boilerfunction.${
              language === "cpp"
                ? "cpp"
                : language === "java"
                ? "java"
                : language === "python"
                ? "py"
                : language === "rust"
                ? "rs"
                : language === "c"
                ? "c"
                : language
            }`
          );
          await fs.promises.writeFile(filePath, boilerplate);
          console.log(`Generated boilerplate.${language} in ${folderPath}`);
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
generateBoilerplatesForAllProblems("../problems");
