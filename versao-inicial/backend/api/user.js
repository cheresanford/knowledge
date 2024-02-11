const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const save = async (req, res) => {
        const user = { ...req.body };
        app.db('users').insert(user).then(_ => res.status(204).send(body));
        res.send('User saved');
    }

    const registerVenda = async (req, res) => {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
    
        try {
            // First, check the current state of 'isVendida' for the user
            const user = await app.db('users').where({ id }).first();
            if (!user) {
                res.status(404).send('Conta não encontrada.'); // User doesn't exist
                return;
            }
            
            if (user.isVendida) {
                res.status(409).send('A conta já está marcada como vendida.'); // Conflict response
                return;
            }
            
            // If 'isVendida' is not true, proceed to update
            const userUpdates = { ...req.body, isVendida: true };
            console.log(userUpdates, 'ksadclkajs')
            const updateCount = await app.db('users')
                .where({ id })
                .update(userUpdates);
    
            if(updateCount) {
                res.status(200).send(`Data de venda registrada para a conta ID ${id}`);
            } else {
                // This block might be redundant due to the initial check, but it's here for completeness
                res.status(404).send('Conta não encontrada.');
            }
        } catch (err) {
            console.error(err); // Log the error for debugging purposes
            res.status(500).send(err); // Error handling
        }
    };
    
    const deleteUser = async (req, res) => {
        const { id } = req.params;
    
        try {
            const deleteCount = await app.db('users')
                .where({id})
                .del();
    
            if(deleteCount > 0) {
                // If the delete operation affected one or more rows, indicating success
                res.status(200).send(`User with ID ${id} deleted successfully.`);
            } else {
                // If no rows were affected, indicating no user was found with that ID
                res.status(404).send('User not found.');
            }
        } catch (error) {
            // Handling any errors that occur during the delete operation
            console.error(error); // Log the error to the console for debugging
            res.status(500).send('An error occurred while deleting the user.');
        }
    };
    

    const update = async (req, res) => {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        const userUpdates = { ...req.body };
    
        app.db('users')
            .where({ id }) // Filter to update the correct user
            .update(userUpdates) // Pass the object with updates
            .then(updateCount => {
                if(updateCount) {
                    res.status(200).send(`User with ID ${id} updated`); // Or res.status(200).send(...) for explicit OK status
                } else {
                    res.status(404).send('User not found'); // If no rows were updated, user doesn't exist
                }
            })
            .catch(err => res.status(500).send(err)); // Error handling
    };

    const get = (req, res) => {
        app.db('users')
            .select('*')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    const  getObservacoes = async (req, res) => {
        const { id } = req.params;

    try {
        const observacoes = await app.db('observacoes')
            .join('users_observacoes', 'observacoes.id', '=', 'users_observacoes.observacao_id')
            .where('users_observacoes.user_id', id)
            .select('observacoes.observacao'); // Adjust this select as needed to fetch desired columns
        const observacoesStringArray = observacoes.map(item => item.observacao)
            res.json(observacoesStringArray);
    } catch (error) {
        console.error('Error fetching observacoes for user:', error);
        res.status(500).send('Error fetching observacoes for user.');
    }
    }

    const getById = (req, res) => {
        
        app.db('users')
            .where('id', req.params.id)
            .select('*')
            .first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    return { save, get, getById, update, deleteUser, registerVenda, getObservacoes }
}