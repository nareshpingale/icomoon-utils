# IcoMoon Utils

This repository contains two utilities for working with IcoMoon icons in your project: `find-similar-icons.js` and `find-unused-icons.js`. These scripts help you identify similar icons and find unused icons in your codebase, respectively.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Find Similar Icons](#find-similar-icons)
  - [Find Unused Icons](#find-unused-icons)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nareshpingale/icomoon-utils.git
   cd icomoon-utils

   ```


2. Install the dependencies:


   ```bash
    npm install
    ```


## Usage

Find Similar Icons
The find-similar-icons.js script compares SVG paths of icons and identifies similar icons based on a similarity threshold.

1. Run the script:

    ```bash
    node find-similar-icons.js
    ```

You will be prompted to provide the path to selection.json and the similarity threshold.

Example:

    ```bash
    Enter the path to selection.json: ./path/to/selection.json
    Enter the similarity threshold (default is 0.99): 0.95
    ```


## Find Unused Icons
The find-unused-icons.js script scans your project files to identify icons that are defined in selection.json but not used in your codebase.

Run the script:

    ```bash
    node find-unused-icons.js
    ```

You will be prompted to provide the path to selection.json and the project directory to scan.

Example:

    ```bash
    Enter the path to selection.json: ./path/to/selection.json
    Enter the project directory to scan: ./path/to/project
    ```

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.
Please ensure your code adheres to the existing style and includes appropriate tests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.