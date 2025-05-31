use anchor_lang::prelude::*;

declare_id!("BhNXnagXZHKE7QtP5xuFL98ahBB3Z1XymSuGj1TuTJaf");

#[program]
pub mod nft_spl_token {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
