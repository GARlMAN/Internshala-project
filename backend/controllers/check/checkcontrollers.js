const catchAsyncErrors = require("../../middlewear/catchAsyncErrors")
const Company = require("../../schema/schema")


//export controllers
//get all tasks
exports.getAllProducts = catchAsyncErrors( async (req, res) => {
    await Company.find()
        .then((tasks) => 
            res.status(201).json({
                success: true,
                tasks
            })
        )
        .catch((err) => res.send({
            status: false,
            error: err
        }))
})


//get single task
exports.getOneProducts = catchAsyncErrors( async (req, res) => {
    await Company.findById(req.params.id )
        .then((task) => 
            res.status(201).json({
                success: true,
                task
            })
        )
        .catch((err) => res.send({
            status: false,
            error: err
        }))
})

//add tasks
exports.addTasks = catchAsyncErrors(async (req, res) => {

    await Company.create(req.body)
        .then((tasks) => 
            res.status(201).json({
                success: true,
                tasks
            })
        )
        .catch((err) => res.send({
            status: false,
            error: err
        }))
})


//delete tasks
exports.deleteTasks = catchAsyncErrors(async (req, res) => {
        try{
            const a = await Company.deleteOne({ _id: req.params.id });
            res.status(201).json({
                success: true,
                message: "task has been removed"
            })
        }
        catch(err){
            res.send({
                status: false,
                message: "id not found",
                error: err
            })
        }
})


//update fucntion
exports.updateTasks = catchAsyncErrors(async (req, res) => {
        await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
            .then((task) => {
                res.status(200).json({
                    success: true,
                    task
                });
            })
            .catch((err) => res.send({
                status: false,
                error: err
            }))

})