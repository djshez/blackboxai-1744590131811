
Built by https://www.blackbox.ai

---

```markdown
# RAM DUMPCHIPS App

## Project Overview

The RAM DUMPCHIPS App is a utility designed for the CPU-NXT3.2 motherboard that facilitates operations related to the RAM dump chips. The application allows users to format CompactFlash cards and write RAM DUMPCHIPS programs directly onto these cards, ensuring efficient management of your device's memory.

## Installation

To install the RAM DUMPCHIPS App, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ram-dumpchips-app.git
   cd ram-dumpchips-app
   ```

2. Install the required dependencies using npm:
   ```bash
   npm install
   ```

## Usage

To start the application, run the following command in your terminal:

```bash
npm start
```

The server will start, and you can access the application in your web browser at [http://localhost:8000](http://localhost:8000).

### API Endpoints

- **Format a CompactFlash Card**
  - **POST** `/api/format`
  - **Body:**
    ```json
    {
      "formatType": "FAT16" // or "FAT32"
    }
    ```
  
- **Write Program to Card**
  - **POST** `/api/write`
  - **Body:**
    ```json
    {
      "ndmpId": "ABCD" // should be 4 alphanumeric characters
    }
    ```

- **Get Device Status**
  - **GET** `/api/status`

## Features

- Supports formatting CompactFlash cards in FAT16 and FAT32 formats.
- Ability to write RAM DUMPCHIPS programs onto cards using a unique NDMP identifier.
- Provides operational status and logs for the device.

## Dependencies

The project has the following dependencies listed in `package.json`:

- **express**: ^4.21.2 - A minimal and flexible Node.js web application framework.
- **body-parser**: ^1.20.3 - Middleware for parsing request bodies in a middleware before your handlers.

## Project Structure

```plaintext
ram-dumpchips-app/
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Exact version of dependencies
├── server.js            # Main server file for handling requests
└── hardware.js          # Hardware interface for managing card operations
└── public/              # Directory for static files (e.g., HTML, CSS, JS)
    └── index.html       # Frontend interface
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for enhancements or bug fixes.

## License

This project is licensed under the MIT License.
```