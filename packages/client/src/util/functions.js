import { KEEPER_TRAITS, PLAYER_TRAITS, POSITIONS } from './constants';

const getPosition = (position) =>
  Number.isInteger(position) ? POSITIONS[position] : position;

const getTraits = (model) => {
  if (model.traits) {
    return model.traits;
  }

  // If player is a keeper
  const TRAITS =
    model.position === 0 || model.position?.s === 'GK'
      ? KEEPER_TRAITS
      : PLAYER_TRAITS;

  const traits = [TRAITS[model.firstStrongPoint]];

  if (model.secondStrongPoint) {
    traits.push(TRAITS[model.secondStrongPoint]);

    if (model.thirdStrongPoint) {
      traits.push(TRAITS[model.thirdStrongPoint]);

      if (model.fourthStrongPoint) {
        traits.push(TRAITS[model.fourthStrongPoint]);
      }
    }
  }

  return traits;
};

// eslint-disable-next-line import/prefer-default-export
export const dataParser = (data) => ({
  id: data.id,
  fullName: data.fullName,
  age: data.age,
  height: data.height,
  weight: data.weight,
  country: data.country,
  team: data.team,
  strongFoot: data.strongFoot,
  position: getPosition(data.position),
  traits: getTraits(data)
});
