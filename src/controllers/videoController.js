import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

const getListVideo = async (req, res) => {
    let data = await model.video.findAll();

    res.send(data);
}

const getListVideoType = async (req, res) => {
    let data = await model.video_type.findAll();

    res.send(data);
}

const getListVideoTypeId = async (req, res) => {
    let {videoTypeId} = req.params;

    let data = await model.video.findAll({
        where: {
            type_id: videoTypeId
        }
    });

    res.send(data);
}

const getVideoDetail = async (req, res) => {
    let {id} = req.params;

    let dataVideo = await model.video.findByPk(id);

    let dataComment = await model.video_comment.findByPk(id, {
        include: ["user"]
    });

    res.send({dataVideo, dataComment})
}

export {
    getListVideo,
    getListVideoType,
    getListVideoTypeId,
    getVideoDetail
};