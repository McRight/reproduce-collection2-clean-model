const isArray = Array.isArray
const array = (a) => (isArray(a) ? a : [])

const getAttachments = (attachments) =>
  Array.isArray(attachments)
    ? attachments.map((attachment) => ({
        category: attachment.category,
        file: attachment.file,
        tags: array(attachment.tags),
      }))
    : []

const setObjectUpdateValues = ({ name, object }) => {
  let objectModifier = { $set: {}, $unset: {} }

  Object.keys(object).forEach((key) => {
    if (
      object[key] instanceof Object &&
      !(object[key] instanceof Date) &&
      !(object[key] instanceof String) &&
      !isArray(object[key])
    ) {
      const subObjectModifier = setObjectUpdateValues({
        name: `${name}.${key}`,
        object: object[key],
      })

      objectModifier = {
        $set: {
          ...objectModifier.$set,
          ...subObjectModifier.$set,
        },
        $unset: {
          ...objectModifier.$unset,
          ...subObjectModifier.$unset,
        },
      }
    } else {
      if (object[key] === null) {
        objectModifier.$unset[`${name}.${key}`] = ' '
      } else {
        objectModifier.$set[`${name}.${key}`] = ['attachments', 'image'].includes(key)
          ? getAttachments(object[key])
          : object[key]
      }
    }
  })

  return objectModifier
}

export const getUpdateModifier = ({ updateValues, isObject }) => {
  let modifier = { $set: {}, $unset: {} }
  const values = { ...updateValues }
  delete values._id
  delete values.slug
  delete values.users
  delete values.collaborators

  // Set deleted values to null
  Object.keys(values).forEach((key) => {
    if (
      !isObject &&
      values[key] instanceof Object &&
      !(values[key] instanceof Date) &&
      !(values[key] instanceof String) &&
      !isArray(values[key])
    ) {
      const objectModifier = setObjectUpdateValues({
        name: key,
        object: values[key],
      })

      modifier = {
        $set: {
          ...modifier.$set,
          ...objectModifier.$set,
        },
        $unset: {
          ...modifier.$unset,
          ...objectModifier.$unset,
        },
      }
    } else {
      if (values[key] === null) {
        modifier.$unset[key] = ' '
      } else {
        modifier.$set[key] = ['attachments', 'image'].includes(key)
          ? getAttachments(values[key])
          : values[key]
      }
    }
  })

  return modifier
}
