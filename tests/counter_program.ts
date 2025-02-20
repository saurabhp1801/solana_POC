
import * as anchor from "@coral-xyz/anchor";

import * as assert from "assert";



describe("counter_program", () => {

  // Configure the client to use the devnet cluster.

  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);



  const program = anchor.workspace.CounterProgram; 

  ;  // Ensure this matches your program name in Anchor.toml

  let counter: anchor.web3.Keypair;



  it("Initializes the counter", async () => {

    // Generate a new Keypair for the counter account

    counter = anchor.web3.Keypair.generate();



    // Initialize the counter

    await program.methods

      .initialize()

      .accounts({

        counter: counter.publicKey,

        user: provider.wallet.publicKey,

        systemProgram: anchor.web3.SystemProgram.programId,

      })

      .signers([counter])

      .rpc();



    // Fetch the account and check the value

    const account = await program.account.counter.fetch(counter.publicKey);

    console.log("Initial Counter Value:", account.value.toString());

    assert.equal(account.value.toString(), "0");

  });



  it("Increments the counter", async () => {

    // Increment the counter

    await program.methods

      .increment()

      .accounts({

        counter: counter.publicKey,

      })

      .rpc();



    // Fetch the account and check the value

    const account = await program.account.counter.fetch(counter.publicKey);

    console.log("Counter Value After Increment:", account.value.toString());

    assert.equal(account.value.toString(), "1");

  });

});