'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];
  let stateCopy = { ...state };

  for (const i of actions) {
    stateCopy = createAction(i.type, stateCopy, i.keysToRemove, i.extraData);

    const prevState = { ...stateCopy };

    actionsArray.push(prevState);
  }

  function createAction(type, copyState, keysToRemove, extraData) {
    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;
      case 'removeProperties':
        for (const el of keysToRemove) {
          delete copyState[el];
        }
        break;
      case 'clear':
        for (const el in copyState) {
          delete copyState[el];
        }
        break;
    }

    return copyState;
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
