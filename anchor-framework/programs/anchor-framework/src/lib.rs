use anchor_lang::prelude::*;

declare_id!("FN6VarcVtDuh6XjpREZeou88CyBD92RVnKfcVu2WxPSU");

#[program]
pub mod anchor_framework {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
