import { Transform } from "stream";
import { HeadTags } from "../../@types";

/**
 * Creates a Transform stream that replaces the head tags of an HTML document.
 *
 * @param {HeadTags} headTags - The head tags to replace in the HTML document.
 * @returns {Transform} The Transform stream.
 */
export const replaceHeadTags = (headTags: HeadTags): Transform => {
  let replaced = false;
  return new Transform({
    /**
     * Transforms the chunk of data.
     *
     * @param {any} chunk - The chunk of data to transform.
     * @param {BufferEncoding} _encoding - The encoding of the chunk (not used in this implementation).
     * @param {(error?: Error | null | undefined, data?: any)} callback - The callback function to invoke after transformation.
     * @returns {void}
     */
    transform(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null | undefined, data?: any) => void): void {
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