import { MCProfiles } from "../models/mc_profiles";

export const GET_player: Function = async (req, res) => {
    const uuid = req.params.uuid;
    res.status(200).send(await MCProfiles.find({where: { uuid: uuid }, relations: ['server', 'network', 'chat']}));
}