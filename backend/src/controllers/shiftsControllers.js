const db = require('../../models/index');

const { Shift } = db;

class ShiftController {

static async createShift(req, res) {
    // #swagger.tags = ['Shift']
    const { date, start_time, end_time, userId } = req.body;

    try{
        const shift = await Shift.findOne({where: {date}});

        if(shift){
            res.status(409).send({message: 'Shift already exists'});
        }else if(!shift){
            const newShift = await Shift.create({
                date,
                start_time,
                end_time,
                userId,
            });

                res.status(201).send({
                message: 'Shift created successfully',
                newShift,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }

}

static async getAllShifts(req, res) {
    // #swagger.tags = ['Shift']
    try{
        const shifts = await Shift.findAll();

        res.status(200).send({
            message: 'Shifts retrieved successfully',
            shifts,
        });
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

static async getShiftById(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;

    try{
        const shift = await Shift.findOne({where: {id}});

        if(!shift){
            res.status(404).send({message: 'Shift not found'});
        } else if(shift){
            res.status(200).send({
                message: 'Shift retrieved successfully',
                shift,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }

}

static async updateShift(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;
    const { date, start_time, end_time, userId } = req.body;

    try{
        const shift = await Shift.findOne({where: {id}});

        if(!shift){
            res.status(404).send({message: 'Shift not found'});
        } else if(shift){
            const updatedShift = await Shift.update(
                { date, start_time, end_time, userId },
                { where: { id }, returning: true, plain: true }
            );

            res.status(200).send({
                message: 'Shift updated successfully',
                updatedShift,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

static async deleteShift(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;

    try{
        const shift = await Shift.findOne({where: {id}});

        if(!shift){
            res.status(404).send({message: 'Shift not found'});
        } else if(shift){
            await Shift.destroy({where: {id}});

            res.status(200).send({
                message: 'Shift deleted successfully',
                shift,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

static async getShiftsByUserId(req, res) {
    // #swagger.tags = ['Shift']
    const { userId } = req.params;

    try{
        const shifts = await Shift.findAll({where: {userId}});

        if(!shifts){
            res.status(404).send({message: 'Shifts not found'});
        } else if(shifts){
            res.status(200).send({
                message: 'Shifts retrieved successfully',
                shifts,
            });
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

}

module.exports = ShiftController;