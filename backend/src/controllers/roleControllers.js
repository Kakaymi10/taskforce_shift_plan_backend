const db = require('../../models/index');

const { Role } = db;

class RoleController {

static async createRole(req, res) {
    const { name, description } = req.body;

    try{
        const role = await Role.findOne({where: {name}});

        if(role){
            res.status(403).send({message: 'Role already exists', role});
        } else if(!role){
            const newRole = await Role.create({
                name,
                description,
            });

            res.status(201).send({
                message: 'Role created successfully',
                newRole,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }

}

static async getAllRoles(req, res) {
    try{
        const roles = await Role.findAll();

        res.status(200).send({
            message: 'Roles retrieved successfully',
            roles,
        });
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

static async getRoleById(req, res) {
    const { id } = req.params;

    try{
        const role = await Role.findOne({where: {id}});

        if(!role){
            res.status(404).send({message: 'Role not found'});
        } else if(role){
            res.status(200).send({
                message: 'Role retrieved successfully',
                role,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }

}

static async updateRole(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try{
        const role = await Role.findOne({where: {id}});

        if(!role){
            res.status(404).send({message: 'Role not found'});
        } else if(role){
            const updatedRole = await Role.update({
                name,
                description,
            }, {where: {id}});

            res.status(200).send({
                message: 'Role updated successfully',
                updatedRole,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

static async deleteRole(req, res) {
    const { id } = req.params;

    try{
        const role = await Role.findOne({where: {id}});

        if(!role){
            res.status(404).send({message: 'Role not found'});
        } else if(role){
            await Role.destroy({where: {id}});

            res.status(200).send({message: 'Role deleted successfully'});
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}


}

module.exports = RoleController;