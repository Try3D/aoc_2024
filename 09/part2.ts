import fs from "fs";

type FileType = {
  i: number;
  idx: number;
  size: number;
};

type FreeSpaceType = {
  idx: number;
  size: number;
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const line = data.trim();

    const files: FileType[] = [];
    const freeSpace: FreeSpaceType[] = [];

    let idx = 0;

    for (let i = 0; i < line.length; i += 2) {
      files.push({ i: i / 2, idx, size: Number(line[i]) });
      idx += Number(line[i]);

      if (i + 1 < line.length) {
        freeSpace.push({ idx, size: Number(line[i + 1]) });
        idx += Number(line[i + 1]);
      }
    }

    for (let i = files.length - 1; i > -1; i--) {
      for (let j = 0; j < freeSpace.length; j++) {
        if (freeSpace[j].size >= files[i].size) {
          files[i].idx = freeSpace[j].idx;
          freeSpace[j].size -= files[i].size;
          freeSpace[j].idx += files[i].size;

          break;
        }
      }
    }

    let total = 0;
    for (let file of files) {
      const sum = (file.size * (2 * file.idx + (file.size - 1))) / 2;
      total += file.i * sum;
    }

    console.log(total);
  },
);
