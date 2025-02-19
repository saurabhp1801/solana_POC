import * as anchor from "@coral-xyz/anchor";
import * as assert from "assert";

describe("counter_program", () => {
  // Configure the client to use the devnet cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CounterProgram;
  let counter: anchor.web3.PublicKey; // Now it will be a PublicKey, not a Keypair

  it("Initializes the counter", async () => {
    // Derive the counter PDA
    const [counterPDA, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("counter")],
      program.programId
    );

    counter = counterPDA;

    // Initialize the counter using the derived PDA
    await program.methods
      .initialize()
      .accounts({
        counter: counterPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the account and check the value
    const account = await program.account.counter.fetch(counterPDA);
    console.log("Initial Counter Value:", account.value.toString());
    assert.equal(account.value.toString(), "0");
  });

  it("Increments the counter", async () => {
    // Derive the counter PDA again before calling increment
    const [counterPDA, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("counter")],
      program.programId
    );

    // Increment the counter
    await program.methods
      .increment()
      .accounts({
        counter: counterPDA,
      })
      .rpc();

    // Fetch the account and check the value
    const account = await program.account.counter.fetch(counterPDA);
    console.log("Counter Value After Increment:", account.value.toString());
    assert.equal(account.value.toString(), "1");
  });
});
