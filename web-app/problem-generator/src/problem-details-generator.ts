import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


export async function generateProblemsMarkdown(
  problemsDir: string
): Promise<void> {
  try {
    const folders = await fs.promises.readdir(problemsDir);

    for (const folder of folders) {
      const structureFilePath = path.join(problemsDir, folder, "Structure.md");
      const outputFilePath = path.join(problemsDir, folder, "problems.md");

      console.log(`Processing folder: ${folder}`);

      try {
        // Read the Structure.md content
        const structureData = await fs.promises.readFile(
          structureFilePath,
          "utf8"
        );

        // Initialize problems.md content with Structure.md data

        //get problem description
        const problemDescriptionMatch = structureData.match(
          /Problem Description:\s*(.+)/
        );
        const problemDescription = problemDescriptionMatch
          ? problemDescriptionMatch[1]
          : "";
        let markdownContent = `# Problem Structure\n\n${structureData}\n\n`;
        markdownContent += `## Problem Description\n\n${problemDescription}\n\n`;

        // Read input files from the inputs directory
        const inputsFolderPath = path.join(
          problemsDir,
          folder,
          "tests",
          "inputs"
        );
        const inputFiles = await fs.promises.readdir(inputsFolderPath);
        const firstTwoInputs = inputFiles.slice(0, 2);

        markdownContent += `## Input Examples\n\n`;

        for (const input of firstTwoInputs) {
          const inputContent = await fs.promises.readFile(
            path.join(inputsFolderPath, input),
            "utf8"
          );
          markdownContent += `**Input (${input}):**\n\`\`\`\n${inputContent}\n\`\`\`\n\n`;
        }

        // Read output files from the outputs directory
        const outputsFolderPath = path.join(
          problemsDir,
          folder,
          "tests",
          "outputs"
        );
        const outputFiles = await fs.promises.readdir(outputsFolderPath);
        const firstTwoOutputs = outputFiles.slice(0, 2);

        markdownContent += `## Expected Output Examples\n\n`;

        for (const output of firstTwoOutputs) {
          const outputContent = await fs.promises.readFile(
            path.join(outputsFolderPath, output),
            "utf8"
          );
          markdownContent += `**Expected Output (${output}):**\n\`\`\`\n${outputContent}\n\`\`\`\n\n`;
        }

        // Write the aggregated content to problems.md
        await fs.promises.writeFile(outputFilePath, markdownContent);
        console.log(`problems.md generated for ${folder}`);
      } catch (err: any) {
        if (err.code === "ENOENT") {
          console.error(`File not found: ${structureFilePath}`);
        } else if (err.code === "EACCES") {
          console.error(`Permission denied for writing ${outputFilePath}`);
        } else {
          console.error(`Error handling ${folder}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Error reading problems directory:", err);
  }
}

// Call the function
generateProblemsMarkdown(process.env.PROBLEMS_DIR as string);
