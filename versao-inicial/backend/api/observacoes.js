module.exports = app => {
    const save = async (req, res) => {
        const { userId, observacaoText } = req.body; // Assume these are passed in the request body

        try {
            console.log('INSERI ESSA PORRA')
            // Step 1: Insert the new observacao
            const [observacaoId] = await app.db('observacoes').insert({
                observacao: observacaoText // Adjust column name as needed
            }).returning('id'); // Ensure to return the ID of the newly inserted observacao
            console.log('INSERI ESSA PORRA222')
            // Step 2: Link the observacao and the user in the junction table
            await app.db('users_observacoes').insert({
                user_id: userId,
                observacao_id: observacaoId
            });
    
            res.status(201).send('Observacao added and linked to user successfully.');
        } catch (error) {
            console.error('Error adding and linking observacao:', error);
            res.status(500).send('Error adding and linking observacao.');
        }
    }
    return {save}
}
