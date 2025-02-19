use anchor_lang::prelude::*;

declare_id!("G6bKHBqCLmd5fyd78GejYSWQZFsEPffSsU6nLUiXLqFM");

#[program]
pub mod counter_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.value = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.value += 1;
        Ok(())
    }
}

#[account]
pub struct Counter {
    pub value: u64, // Global counter value
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8, // 8 bytes for discriminator, 8 for u64
        seeds = [b"counter".as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, seeds = [b"counter".as_ref()], bump)]
    pub counter: Account<'info, Counter>,
}
