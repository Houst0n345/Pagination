import {action, computed, decorate, observable} from 'mobx';

type PaginationItem = {
    id: number
    elementWidth: number
}
type State = {
    initialArrayOfElements: Array<number>,
    currentPosition: number,
    widthOfComponent: number
}

class Store {
    state: State =  {
        initialArrayOfElements: [0],
        currentPosition: 0,
        widthOfComponent: 0,
    }

    changeCurrentPosition(page: number){
        this.state.currentPosition = page;
    }
    setInitialArrayOfElements(arr: Array<number>){
        this.state.initialArrayOfElements = arr
    }
    setWidthOfComponent(width: number){
        this.state.widthOfComponent = width
    }

    // vars widthOfComponent, initialArrayOfElement, currentPosition
    get renderArrOfElements(){

       let paginationWidth;
        let currentWidth = 0;
        let resultArr: Array<PaginationItem> = [];
        let iteration = 0;
        let factor = 0;

        if (this.state.widthOfComponent >= 769) {
            paginationWidth = this.state.widthOfComponent / 2 - 60
        } else {
            paginationWidth = this.state.widthOfComponent -60
        }

        let addElement = (i: number) => {
                resultArr.push({id: i, elementWidth: this.state.initialArrayOfElements[i]})
                if (this.state.widthOfComponent >= 769) {
                    currentWidth += this.state.initialArrayOfElements[i] + 25
                } else {
                    currentWidth +=  this.state.initialArrayOfElements[i] + 25
                }
        };

        while (paginationWidth > currentWidth && iteration<=this.state.initialArrayOfElements.length){
            if(factor){
                factor = 0;
                iteration++
            } else {
                factor=1
            }
            let index = this.state.currentPosition + iteration*((-1)**factor)

            if(index>=  0 && index<this.state.initialArrayOfElements.length){
                addElement(index)
            }

        }

        let sortFunc = (a: PaginationItem,b: PaginationItem)=>{
            let comparison = 0;
            if (a.id > b.id) {
                comparison = 1;
            } else if (a.id < b.id) {
                comparison = -1;
            }
            return comparison;
        }

       return   resultArr.sort(sortFunc)
    }
}


decorate(Store, {
    state: observable,
    changeCurrentPosition: action,
    setInitialArrayOfElements: action,
    setWidthOfComponent: action,
    renderArrOfElements: computed
})

export default new Store();