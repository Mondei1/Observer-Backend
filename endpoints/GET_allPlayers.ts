import { MCProfiles } from "../models/mc_profiles";

export const GET_allPlayers: Function = async (req, res) => {
    res.status(200).send(await MCProfiles.find());
}