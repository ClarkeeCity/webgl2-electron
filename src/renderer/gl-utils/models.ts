import Teapot from '../../models/teapot.obj';
import Cube from '../../models/cube.obj';

const models: Record<string, string> = {
  'cube.obj': Cube,
  'teapot.obj': Teapot,
};

// eslint-disable-next-line import/prefer-default-export
export { models as Models };
