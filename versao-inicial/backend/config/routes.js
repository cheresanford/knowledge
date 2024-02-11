module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get);
    app.route('/users/:id')
        .get(app.api.user.getById)
        .post(app.api.user.update)
        .delete(app.api.user.deleteUser);
    app.route('/users/:id/observacoes')
        .get(app.api.user.getObservacoes)
    app.route('/users/venda/:id')
        .post(app.api.user.registerVenda)
    app.route('/observacoes')
        .post(app.api.observacoes.save)

}