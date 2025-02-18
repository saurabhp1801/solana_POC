# Counter Program on Solana  

A simple program built on Solana using the Anchor framework. This project demonstrates how to use **Program Derived Addresses (PDA)** to manage a counter that can be incremented.

---

## Project Features  
- **PDA Implementation**: Uses seeds and bump to derive the program's address.  
- **Anchor Framework**: Simplifies Solana smart contract development.  
- **Solana Program**: Written in Rust and deployed on Solana.  
- **Testing Suite**: Includes TypeScript tests to interact with the deployed program.

---

## Prerequisites  
Before running this project, ensure the following are installed on your system:  

- **Rust and Cargo**: Install Rust from [Rust's Official Site](https://www.rust-lang.org/).  
- **Solana CLI**: Follow the [Solana CLI installation guide](https://docs.solana.com/cli/install-solana-cli-tools).  
- **Anchor Framework**: Install Anchor via npm:  
  ```bash
  cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
