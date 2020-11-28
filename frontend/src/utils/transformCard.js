export const transformCard = (newCard) => ({
  link: newCard.link,
  likes: newCard.likes,
  name: newCard.name,
  _id: newCard._id,
  owner: newCard.owner,
});
