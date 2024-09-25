const chemicalData = [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100, unit: "kg", quantity: 6495.18 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100, unit: "kg", quantity: 8751.90 },
    { id: 3, chemicalName: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75, unit: "L", quantity: 5964.61 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105, unit: "kg", quantity: 8183.73 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105, unit: "kg", quantity: 4154.33 },
    { id: 6, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: "N/A", unit: "t", quantity: 6272.34 },
    { id: 7, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250, unit: "kg", quantity: 8749.54 },
    { id: 8, chemicalName: "Hydrogen Peroxide", vendor: "BASF", density: 1350.50, viscosity: 15.42, packaging: "Can", packSize: 50, unit: "L", quantity: 1250.00 },
    { id: 9, chemicalName: "Sodium Bicarbonate", vendor: "Tata Chemicals", density: 2500.00, viscosity: 20.50, packaging: "Bag", packSize: 100, unit: "kg", quantity: 9800.00 },
    { id: 10, chemicalName: "Acetic Acid", vendor: "LG Chem", density: 1105.56, viscosity: 45.70, packaging: "Drum", packSize: 200, unit: "L", quantity: 6400.00 },
    { id: 11, chemicalName: "Sulfuric Acid", vendor: "DowDuPont", density: 1820.37, viscosity: 34.45, packaging: "Barrel", packSize: 100, unit: "L", quantity: 5245.00 },
    { id: 12, chemicalName: "Ammonium Nitrate", vendor: "Formosa", density: 1700.25, viscosity: 80.30, packaging: "Bag", packSize: 105, unit: "kg", quantity: 11500.00 },
    { id: 13, chemicalName: "Ethanol", vendor: "BASF", density: 789.50, viscosity: 12.70, packaging: "Drum", packSize: 50, unit: "L", quantity: 7800.00 },
    { id: 14, chemicalName: "Methanol", vendor: "Tata Chemicals", density: 792.80, viscosity: 55.32, packaging: "Can", packSize: 100, unit: "L", quantity: 5400.00 },
    { id: 15, chemicalName: "Glycerin", vendor: "LG Chem", density: 1261.30, viscosity: 93.50, packaging: "Barrel", packSize: 200, unit: "L", quantity: 8500.00 }
];

let selectedRowIndex = null;

const tableBody = document.getElementById('tableBody');
const originalData = JSON.parse(JSON.stringify(chemicalData)); // Deep copy to store original data

function loadTable(data) {
    tableBody.innerHTML = "";
    data.forEach((chemical, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="rowCheckbox"></td>
            <td>${chemical.id}</td>
            <td contenteditable="true">${chemical.chemicalName}</td>
            <td contenteditable="true">${chemical.vendor}</td>
            <td contenteditable="true">${chemical.density}</td>
            <td contenteditable="true">${chemical.viscosity}</td>
            <td contenteditable="true">${chemical.packaging}</td>
            <td contenteditable="true">${chemical.packSize}</td>
            <td contenteditable="true">${chemical.unit}</td>
            <td contenteditable="true">${chemical.quantity}</td>
        `;
        row.dataset.index = index;
        tableBody.appendChild(row);
    });
}

loadTable(chemicalData);

// Add row functionality
document.getElementById('addRow').addEventListener('click', () => {
    const newRow = {
        id: chemicalData.length + 1,
        chemicalName: "New Chemical",
        vendor: "New Vendor",
        density: 1000.00,
        viscosity: 50.00,
        packaging: "Bag",
        packSize: 100,
        unit: "kg",
        quantity: 5000.00
    };
    chemicalData.push(newRow);
    loadTable(chemicalData);
});

// Move row up
document.getElementById('moveUp').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked && index > 0) {
            const temp = chemicalData[index];
            chemicalData[index] = chemicalData[index - 1];
            chemicalData[index - 1] = temp;
        }
    });
    loadTable(chemicalData);
});

// Move row down
document.getElementById('moveDown').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked && i < chemicalData.length - 1) {
            const temp = chemicalData[i];
            chemicalData[i] = chemicalData[i + 1];
            chemicalData[i + 1] = temp;
        }
    }
    loadTable(chemicalData);
});

// Delete row
document.getElementById('deleteRow').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    const filteredData = chemicalData.filter((_, index) => !checkboxes[index].checked);
    chemicalData.length = 0;
    chemicalData.push(...filteredData);
    loadTable(chemicalData);
});

// Refresh data
document.getElementById('refresh').addEventListener('click', () => {
    chemicalData.length = 0;
    chemicalData.push(...JSON.parse(JSON.stringify(originalData)));
    loadTable(chemicalData);
});

// Save functionality
document.getElementById('save').addEventListener('click', () => {
    alert("Data saved successfully!");
});

// Sorting functionality
document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => {
        if (index === 0) return; // Ignore checkbox column

        const key = Object.keys(chemicalData[0])[index - 1];
        chemicalData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        loadTable(chemicalData);
    });
});
