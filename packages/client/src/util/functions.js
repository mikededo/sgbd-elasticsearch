import { PLAYER_TRAITS, POSITIONS } from './constants';

const getTraits = (model) => {
  if (model.traits) {
    return model.traits;
  }

  const traits = [PLAYER_TRAITS[model.firstStrongPoint]];

  if (model.secondStrongPoint) {
    traits.push(PLAYER_TRAITS[model.secondStrongPoint]);

    if (model.thirdStrongPoint) {
      traits.push(PLAYER_TRAITS[model.thirdStrongPoint]);

      if (model.fourthStrongPoint) {
        traits.push(PLAYER_TRAITS[model.fourthStrongPoint]);
      }
    }
  }

  return traits;
};

// eslint-disable-next-line import/prefer-default-export
export const dataParser = (data) => ({
  id: data.id,
  fullName: data.fullName,
  height: data.height,
  weight: data.weight,
  country: data.country,
  team: data.team,
  strongFoot: data.strongFoot,
  position: POSITIONS[data.position],
  traits: getTraits(data)
});
