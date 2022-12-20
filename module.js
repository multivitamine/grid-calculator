const getGridData = grid => {
    const gridComputedStyle = window.getComputedStyle(grid);
  
    return {
      // get number of grid rows
      gridRowCount: gridComputedStyle.getPropertyValue('grid-template-rows').split(' ').length,
      // get number of grid columns
      gridColumnCount: gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length,
      // get grid row sizes
      gridRowSizes: gridComputedStyle
        .getPropertyValue('grid-template-rows')
        .split(' ')
        .map(parseFloat),
      // get grid column sizes
      gridColumnSizes: gridComputedStyle
        .getPropertyValue('grid-template-columns')
        .split(' ')
        .map(parseFloat),
      // get grid length
      gridLength: grid.children.length,
      grid
    };
  };
  const outputGridData = module => {
    const gridData = getGridData(module);
    const gridItemLength = gridData.gridLength;
    const columns = gridData.gridColumnCount;
    const rows = gridData.gridRowCount;
    const gridObject = gridData.grid;
    const topColumns = (rows - 1) * columns;
  
    for (let i = 0; gridItemLength - 1 >= i; i += 1) {
      gridObject.children[i].classList.remove('lastRow');
      gridObject.children[i].classList.remove('firstRow');
    }
    if (rows > 1) {
      for (let j = topColumns + 1; gridItemLength >= j; j += 1) {
        gridObject.children[j - 1].classList.add('lastRow');
      }
    }
    for (let k = 0; gridData.gridColumnCount >= k + 1; k += 1) {
      gridObject.children[k].classList.add('firstRow');
    }
  };
  
  class GridCalculator {
    constructor() {
      this.config = {
        moduleList: document.querySelectorAll('[data-module="gridCalculator"]')
      };
    }
  
    init() {
      const { moduleList } = this.config;
      moduleList.forEach(module => {
        outputGridData(module);
      });
    }
  }
  
  export default GridCalculator;
  