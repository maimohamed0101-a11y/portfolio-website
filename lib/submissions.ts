import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { ContactInput } from "./validation";

export type Submission = ContactInput & { id: string; createdAt: string; userAgent?: string };

function filePath() {
  const dir = process.env.SUBMISSIONS_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "data");
  return { dir, file: path.join(dir, "submissions.json") };
}

// Serialise writes within this process so concurrent requests don't clobber the file.
let queue: Promise<unknown> = Promise.resolve();

export function saveSubmission(input: ContactInput, userAgent?: string): Promise<Submission> {
  const run = async () => {
    const { dir, file } = filePath();
    await fs.mkdir(/*turbopackIgnore: true*/ dir, { recursive: true });

    let existing: Submission[] = [];
    try {
      existing = JSON.parse(await fs.readFile(/*turbopackIgnore: true*/ file, "utf8"));
      if (!Array.isArray(existing)) existing = [];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }

    const submission: Submission = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
      userAgent: userAgent?.slice(0, 300),
    };
    existing.push(submission);

    const tmp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(/*turbopackIgnore: true*/ tmp, JSON.stringify(existing, null, 2), "utf8");
    await fs.rename(/*turbopackIgnore: true*/ tmp, file);
    return submission;
  };

  const result = queue.then(run, run);
  queue = result.catch(() => undefined);
  return result;
}
