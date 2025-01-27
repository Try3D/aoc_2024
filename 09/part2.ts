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
    const free: FreeSpaceType[] = [];

    let idx = 0;

    for (let i = 0; i < line.length; i += 2) {
      files.push({ i: i / 2, idx, size: Number(line[i]) });
      idx += Number(line[i]);

      if (i + 1 < line.length) {
        free.push({ idx, size: Number(line[i + 1]) });
        idx += Number(line[i + 1]);
      }
    }

    const span: FreeSpaceType[] = [];
    for (let i = 0; i < free.length; i++) {
      if (
        span.length > 0 &&
        free[i].idx === span[span.length - 1].idx + span[span.length - 1].size
      ) {
        span[span.length - 1].size += free[i].size;
      } else {
        span.push({ ...free[i] });
      }
    }

    for (let i = files.length - 1; i >= 0; i--) {
      for (let j = 0; j < span.length; j++) {
        if (span[j].size >= files[i].size && span[j].idx < files[i].idx) {
          files[i].idx = span[j].idx;
          span[j].size -= files[i].size;
          span[j].idx += files[i].size;

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
