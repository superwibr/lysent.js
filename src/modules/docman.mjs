/**
 * What if document
 */

const docman = {
    async _fetchParse(uri){
        const thing = await fetch(uri).then(res => res.text()),
        doc = new DOMParser().parseFromString(thing, "text/html").documentElement;
    },

    /**
     * Write a `documentElement` to the current window, and return the replaced document.
     * @param {documentElement} doc 
     */
    async swap(doc){
        const bkp = document.documentElement;

        document.open();
        document.append(doc);
        document.close();

        return bkp;
    },
    
    /**
     * Get document from URI, write it to the current window, and return the replaced document.
     * @param {string} uri the uri to get the new `documentElement` from.
     */
    async URISwap(uri){
        const doc = await this._fetchParse(uri);
        return await this.swap(doc);
    }
}