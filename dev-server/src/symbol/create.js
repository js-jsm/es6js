import Actions from './Enum';

export default () => {

    switch(Actions.APPLE) {
        case Actions.APPLE:
            console.log('APPLE'); break;

        case Actions.BANANA:
            console.log('BANANA'); break;

        case Actions.ORANGE:
            console.log('ORANGE'); break;
    }
};