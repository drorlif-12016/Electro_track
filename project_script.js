// ---------------------- Project JavaScript ----------------------

/** Product Data **/
const products = [
    {
        id: 1,
        name: "Control Hub",
        description: "",
        category: "control system",
        currentStock: 2,
        minStock: 1,
        price: 22.99,
        specs: { "Processor": "ATmega328P", "Operating Voltage": "5V", "Digital I/O Pins": "14", "Analog Input Pins": "6", "Flash Memory": "32 KB", "Clock Speed": "16 MHz" }
    },
    {
        id: 2,
        name: "Raspberry Pi 4",
        description: "Latest Raspberry Pi 4 Model B with 1GB, 2GB, 4GB or 8GB of LPDDR4 SDRAM.",
        category: "Single-board Computers",
        currentStock: 8,
        minStock: 3,
        price: 45.00,
        specs: { "Processor": "Broadcom BCM2711", "CPU": "Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz", "RAM": "Variants from 2GB to 8GB LPDDR4-3200", "Connectivity": "Dual-band 2.4GHz and 5GHz wireless LAN", "Ports": "2 × USB 3.0, 2 × USB 2.0, 2 × micro-HDMI" }
    }
    // ... (add other products as needed)
];

/** Hub Ports **/
let currentControlHubPorts = [];
let currentExpansionHubPorts = [];
let currentServoHubPorts = [];
let selectedProduct = null;
let productsToCompare = [];

/** DOM Elements **/
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const catalogList = document.getElementById('catalog-list');
const stockList = document.getElementById('stock-list');
const controlHubList = document.getElementById('control-hub-list');
const expansionHubList = document.getElementById('expansion-hub-list');
const servoHubList = document.getElementById('servo-hub-list');
const productDetail = document.getElementById('product-detail');
const detailContent = document.getElementById('detail-content');
const comparisonSection = document.getElementById('comparison-section');
const compareAddBtn = document.getElementById('compare-add-btn');
const compareViewBtn = document.getElementById('compare-view-btn');
const backButton = document.getElementById('back-button');
const comparisonView = document.getElementById('comparison-view');
const comparisonContent = document.getElementById('comparison-content');
const backFromComparison = document.getElementById('back-from-comparison');
const hubPortDetail = document.getElementById('hub-port-detail');
const portModal = document.getElementById('port-modal');
const savePortBtn = document.getElementById('save-port');
const cancelPortBtn = document.getElementById('cancel-port');
const addControlPortBtn = document.getElementById('add-control-port');
const addExpansionPortBtn = document.getElementById('add-expansion-port');
const addServoPortBtn = document.getElementById('add-servo-port');

/** Tab Switching **/
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active', 'text-blue-500'));
        tabButtons.forEach(btn => btn.classList.add('text-gray-600'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active', 'text-blue-500');
        button.classList.remove('text-gray-600');
        document.getElementById(button.dataset.tab).classList.add('active');

        productDetail.classList.add('hidden');
        comparisonView.classList.add('hidden');
    });
});

/** Save/Load Port Data **/
function savePortData() {
    try {
        const portData = { 
            controlHub: currentControlHubPorts, 
            expansionHub: currentExpansionHubPorts, 
            servoHub: currentServoHubPorts 
        };
        localStorage.setItem('hubPorts', JSON.stringify(portData));
        console.log('Port data saved!');
    } catch (error) {
        console.error('Error saving port data:', error);
    }
}

function loadPortData() {
    try {
        const savedData = localStorage.getItem('hubPorts');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            currentControlHubPorts = parsedData.controlHub || [];
            currentExpansionHubPorts = parsedData.expansionHub || [];
            currentServoHubPorts = parsedData.servoHub || [];
        }
    } catch (error) {
        console.error('Error loading port data:', error);
        // Reset to empty arrays if data is corrupted
        currentControlHubPorts = [];
        currentExpansionHubPorts = [];
        currentServoHubPorts = [];
    }
}

/** Initialize App **/
function initApp() {
    try {
        renderProductCatalog();
        renderStockList();
        renderControlHub();
        renderExpansionHub();
        renderServoHub();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

/** Product Catalog **/
function renderProductCatalog() {
    try {
        if (!catalogList) {
            console.error('Catalog list element not found');
            return;
        }
        
        catalogList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg shadow p-4 cursor-pointer';
            productCard.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-semibold text-blue-600">${product.name}</h3>
                        <p class="text-sm text-gray-600 mt-1">${product.category}</p>
                        <p class="text-sm mt-2 line-clamp-2">${product.description}</p>
                    </div>
                    <button class="edit-product-btn p-1 text-gray-400 hover:text-blue-500" data-id="${product.id}">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-green-600 font-medium">$${product.price.toFixed(2)}</span>
                    <div class="text-right">
                        <span class="text-xs px-2 py-1 rounded-full ${product.currentStock > product.minStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            Stock: ${product.currentStock}/${product.minStock}
                        </span>
                    </div>
                </div>
            `;
            productCard.addEventListener('click', (e) => {
                if (!e.target.closest('.edit-product-btn')) {
                    showProductDetail(product);
                }
            });
            catalogList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error rendering product catalog:', error);
    }
}

/** Render Stock List and Hub Ports (omitted for brevity, similar logic to above) **/

/** Save ports after adding/editing/deleting **/
if (savePortBtn) {
    const newPort = { portNumber, device, system, portType, status };
}

const deletePortBtn = document.getElementById('delete-port-btn');
if (deletePortBtn) {
    deletePortBtn.addEventListener('click', () => setTimeout(savePortData, 100));
}

/** Initial Load **/
document.addEventListener('DOMContentLoaded', () => {
    loadPortData();
    initApp();
});