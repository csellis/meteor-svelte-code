import { UserItems, Categories, Items } from "../api/collections";

Meteor.methods({
  'Items.categorize'(itemId, categoryId) {
    const category = Categories.findOne(categoryId);
    // console.log({category, item})

    const updatedItems = Items.update({_id: itemId}, {
      $set: {
        "categoryId": categoryId,
        "categoryName": category.name,
        "updatedAt": new Date()
      }
    });

    const updateUserItems = UserItems.update({ itemId }, {
      $set: {
        categoryId,
        categoryName: category.name,
      }
    });

    return {
      updatedItems,
      updateUserItems
    }

  },
  'UserItems.add'(itemId) {

    const item = Items.findOne(itemId);

    const userItem = {
      userId: this.userId,
      itemId,
      itemName: item.name,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      picked: false,
      createdAt: new Date(),
    }
    return UserItems.insert(userItem)
  },
  'UserItems.remove'(userItemId) {
    return UserItems.remove(userItemId);
  },
  'Items.add'(name) {
    const userId = this.userId;
    // console.log({ name })
    // check if name exists
    const itemExists = Items.findOne({ name });
    var itemId;

    if (itemExists) {
      itemId = itemExists._id;
    } else {
      // find global category for Uncategorized
      const uncategorized = Categories.findOne({ name: "Uncategorized" });
      // console.log({ uncategorized })

      // build item
      const item = {
        name,
        createdBy: userId,
        categoryName: uncategorized.name,
        categoryId: uncategorized._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      itemId = Items.insert(item);
    }

    // add to user's list
    Meteor.call('UserItems.add', itemId, (err, res) => {
      if (err) console.warn(err);
    })
  },
  'Categories.add'({ name }) {
    // Create a new Global Category
    // Prevent duplicate category names
    var itemWithSameName = Categories.findOne({ name });
    if (itemWithSameName) {
      return {
        categoryExists: true,
        _id: itemWithSameName._id
      }
    }

    // Determine rank for new category
    var nextRank = Categories.find().fetch().length;

    var item = {
      name,
      rank: nextRank,
      created: new Date()
    }

    var itemId = Categories.insert(item);
    return {
      _id: itemId
    };
  },
});

// model Item {
//   id         Int      @id @default(autoincrement())
//   name       String
//   published  Boolean  @default(true)
//   category   Category @relation(fields: [categoryId], references: [id])
//   categoryId Int
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt
// }