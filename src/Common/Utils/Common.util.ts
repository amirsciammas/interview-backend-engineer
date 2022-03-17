export class Common {
  static OffsetLimitParser(
    page = 1,
    size = 25,
  ): { offset: number; limit: number } {
    const offset = page > 0 ? size * (page - 1) : 0;
    return { offset, limit: size };
  }
}
