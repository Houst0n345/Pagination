import {action, computed, decorate, observable} from 'mobx';

type PaginationItem = {
    id: number
    elementWidth: number
}

class Store {
    state =  {
        initialArrayOfElements: [0],
        currentPage: 0,
        widthOfComponent: 0
    }

    changeCurrentPage(page: number){
        this.state.currentPage = page;
    }
    setInitialArrayOfElements(arr: Array<number>){
        this.state.initialArrayOfElements = arr
    }
    setWidthOfComponent(width: number){
        this.state.widthOfComponent = width
    }
    get renderArrOfElements(){
        let paginationWidth = 0;
        if (this.state.widthOfComponent > 768) {
            paginationWidth = this.state.widthOfComponent / 2 - 46
        } else {
            paginationWidth = this.state.widthOfComponent - 46
        }
        let widthOfCurrentPage = 0;
        let resultArr: Array<PaginationItem> = [];
        for (let i = this.state.currentPage; i < this.state.initialArrayOfElements.length; i++) {
            if (paginationWidth > widthOfCurrentPage) {
                resultArr.push({id: i, elementWidth: this.state.initialArrayOfElements[i]})
                if (this.state.widthOfComponent > 768) {
                    widthOfCurrentPage += this.state.initialArrayOfElements[i] + 16
                } else {
                    widthOfCurrentPage= widthOfCurrentPage + this.state.initialArrayOfElements[i] + 25
                }
            }
        }
        let beforActivePageArr: Array<PaginationItem> = []
        for (let i = this.state.currentPage - 1; i >= 0; i--) {
            if (paginationWidth > widthOfCurrentPage) {
                beforActivePageArr.push({id: i, elementWidth: this.state.initialArrayOfElements[i]})
                if (this.state.widthOfComponent > 768) {
                    widthOfCurrentPage += this.state.initialArrayOfElements[i]+16
                } else {
                    widthOfCurrentPage= widthOfCurrentPage + this.state.initialArrayOfElements[i] + 16
                }
            }
        }
        return beforActivePageArr.reverse().concat(resultArr)
    }
}


decorate(Store, {
    state: observable,
    changeCurrentPage: action,
    setInitialArrayOfElements: action,
    renderArrOfElements: computed
})

export default new Store();