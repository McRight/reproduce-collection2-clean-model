import { Pages } from '../../../collections';

import { getUpdateFields } from './getUpdateFields';
import { getUpdateModifier } from './getUpdateModifier';

export const updatePage = ({ page, userId, values }) => {
  const { updateValues, ...updateHistory } = getUpdateFields({
    values,
    initialValues: page,
  });
  console.log(JSON.stringify({ updateValues }, null, 2));
  console.log(JSON.stringify({ ...updateHistory }, null, 2));

  const pageModifier = getUpdateModifier({ updateValues });
  pageModifier.$set.hasChanged = true;
  console.log(JSON.stringify({ pageModifier }, null, 2));

  console.log('goes here');
  Pages.update(page._id, pageModifier, { userId, ...updateHistory });
  console.log('but not here, right?');
};
