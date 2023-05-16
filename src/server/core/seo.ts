import { Transform } from "stream";
import { HeadTags } from "../../@types/hoosat-template";

export const replaceHeadTags = (headTags: HeadTags) => {
  let replaced = false;
  return new Transform({
    transform(chunk, _encoding, callback) {
      if (replaced) {
        callback(null, chunk);
        return;
      }
      const chunkStr = chunk.toString();
      const headOpenTagMatch = chunkStr.match(/<head[^>]*>/i);
      const headCloseTagMatch = chunkStr.match(/<\/head>/i);
      if (!headOpenTagMatch || !headCloseTagMatch) {
        callback(null, chunk);
        return;
      }
      const headContent = chunkStr.substring(
        headOpenTagMatch.index + headOpenTagMatch[0].length,
        headCloseTagMatch.index
      );
      const newHeadContent = `${headContent}${headTags.title ?? ''}${headTags.style ?? ''}${headTags.meta ?? ''}${headTags.script ?? ''}${headTags.base ?? ''}`;
      const newChunkStr = `${chunkStr.substring(0, headOpenTagMatch.index + headOpenTagMatch[0].length)}${newHeadContent}${chunkStr.substring(headCloseTagMatch.index)}`;
      chunk = Buffer.from(newChunkStr);
      replaced = true;
      callback(null, chunk);
    }
  });
};