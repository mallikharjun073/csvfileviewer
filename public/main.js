// public/main.js

// Function to upload a CSV file with a custom filename
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const fileListContainer = document.getElementById('fileListItems');
    const uploadButton = document.getElementById('uploadbutton');

    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file to upload.');
        return;
    }

    // Specify a custom filename, e.g., using a timestamp or a unique identifier
    const customFilename = `custom-${Date.now()}.csv`;

    const formData = new FormData();
    formData.append('csvfile', file, customFilename);

    // Disable the upload button during the upload process
    uploadButton.disabled = true;

    try {
        // Display a loading indicator (optional)
        // You can implement this using a spinner or other UI elements
        console.log('Uploading...');

        const response = await fetch('http://localhost:3000/csv/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            alert('File uploaded successfully.');
            // Refresh the list of uploaded files after successful upload
            fetchCSVFiles();
        } else {
            alert(`Failed to upload file. ${data.error}`);
            console.error(data.error);
        }
    } catch (error) {
        alert('Error uploading file. Please try again later.');
        console.error('Error uploading file:', error.message);
    } finally {
        // Enable the upload button after the upload process is complete
        uploadButton.disabled = false;

        // Clear the file input after uploading
        fileInput.value = null;
    }
}

  

  
// Function to fetch the list of uploaded CSV files
async function fetchCSVFiles() {
    try {
      const response = await fetch('/csv/files');
      const data = await response.json();
      
      if (data.success) {
        displayFileList(data.files);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching CSV files:', error.message);
    }
  }
  
  // Function to display the list of uploaded CSV files
  function displayFileList(files) {
    const fileListContainer = document.getElementById('fileListItems');
    fileListContainer.innerHTML = ''; // Clear previous items
  
    files.forEach(file => {
      const listItem = document.createElement('a');
      listItem.classList.add('list-group-item', 'list-group-item-action');
      listItem.textContent = file;
      listItem.addEventListener('click', () => showCSVData(file));
      fileListContainer.appendChild(listItem);
    });
  }
  
  // Function to fetch and display CSV data when a file is clicked
  async function showCSVData(filename) {
    try {
      const response = await fetch(`/csv/data/${filename}`);
      const data = await response.json();
  
      if (data.success) {
        displayCSVTable(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching CSV data:', error.message);
    }
  }
  
  // Function to display CSV data in a table
  function displayCSVTable(data) {

    // Get the container element where you want to display the table
    const tableContainer = document.getElementById('csvTableContainer');

    // Create a table element
    const table = document.getElementById('striptable');
    table.innerHTML = '';
    // Create thead element
    const thead = document.createElement('thead');
  
    // Create an empty header row
    const emptyHeaderRow = document.createElement('tr');
    const emptyHeaderCell = document.createElement('th');
    emptyHeaderRow.appendChild(emptyHeaderCell);
  
    // Append the empty header row to the thead
    thead.appendChild(emptyHeaderRow);
  
    // Extract column headers from the first data row
    const headers = Object.keys(data[0]);
  
    // Create header row
    const headerRow = document.createElement('tr');
  
    // Create header cells and append them to the header row
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
  
    // Append the header row to the thead
    thead.appendChild(headerRow);
  
    // Append the thead to the table
    table.appendChild(thead);
  
    // Create tbody element
    const tbody = document.createElement('tbody');
  
    // Create rows and cells for each data entry
    data.forEach(entry => {
      const row = document.createElement('tr');
  
      // Create an empty cell at the beginning of each row
      const emptyCell = document.createElement('td');
      row.appendChild(emptyCell);
  
      // Populate cells with data
      headers.forEach(header => {
        const cell = document.createElement('td');
        cell.textContent = entry[header];
        row.appendChild(cell);
      });
  
      // Append the row to the tbody
      tbody.appendChild(row);
    });
  
    // Append the tbody to the table
    table.appendChild(tbody);
  
    // Append the table to the container
    tableContainer.appendChild(table);
  }
  
  fetchCSVFiles();

  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
     searchInput.addEventListener('input', function () {
      const dataRows = document.querySelectorAll('#striptable tbody tr');

    const searchTerm = this.value.trim().toLowerCase();

    dataRows.forEach(function (row) {
      const cells = row.querySelectorAll('td');
      let isMatch = false;

      cells.forEach(function (cell) {
        const cellText = cell.textContent.toLowerCase();

        if (cellText.includes(searchTerm)) {
          isMatch = true;
        }
      });

      row.style.display = isMatch ? '' : 'none';
    });
  });
  });