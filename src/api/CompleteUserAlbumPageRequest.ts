
/** The request used to retrieve a detailed page of a user's album collection. */
export class CompleteUserAlbumPageRequest {
    constructor(id: number, page_number: number, element_number: number, album_title_sorting_criteria: Sort.Criteria) {
        if (isNaN(id)) {
            throw new Error('A valid ID must be provided');
        }
        if (isNaN(page_number) || page_number <= 0) {
            page_number = 1;
        }
        if (isNaN(element_number) || element_number <= 0) {
            element_number = 5;
        }
        this.id = id;
        this.page_number = page_number;
        this.element_number = element_number;
        this.album_title_sorting_criteria =
            Object.values(Sort.Criteria).includes(album_title_sorting_criteria as Sort.Criteria) ?
                album_title_sorting_criteria : null;
    }

    /** The ID of the user of interest. */
    private readonly id: number;

    /** The requested page number; defaults to 1. */
    private readonly page_number: number;

    /** The requested number of elements; defaults to 5. */
    private readonly element_number: number;

    /** The status indicating whether the result should be sorted by album title, if null, no ordering will be applied. */
    private readonly album_title_sorting_criteria: Sort.Criteria;

    get getId(): number {
        return this.id;
    }

    get getPageNumber(): number | 1 {
        return this.page_number;
    }

    get getElementNumber(): number | 5 {
        return this.element_number;
    }

    get getAlbumTitleSortingCriteria(): Sort.Criteria {
        return this.album_title_sorting_criteria;
    }
}

export namespace Sort {
    export enum Criteria {
        ASC,
        DESC
    }
}
