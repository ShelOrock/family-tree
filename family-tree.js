class FamilyTree {
  constructor (value) {
    if(typeof value != 'string') throw '';
    this.value = value;
    this.children = [];
  }

  familySize() {
    return this.children.length + 1;
  }

  findMember(name) {
    let currentNode = undefined;

    if(name === this.value) {
      currentNode = this;
    }

    this.children.forEach(child => {
      if(child.children.length) {
        currentNode = child.findMember(child.value);
      } else if(name === child.value) {
        currentNode = child;
      }
    });

    return currentNode;
  }

  log() {
    // let squad = []
    // squad.push(this.value);
    // squad.push(this.children.map(child => {
    //   if(child.children.length) {
    //     return squad.push(child.log());
    //   }
    //   return child.value;
    // }));
    
    const tree = `-- ${this.value} 
${this.children.map(child => {
      
      if(child.children.length) {
        return `--${child.log()}`;
      } else {
      return `------ ${child.value}`
      }
    }).join('\n')}`
    return tree
  }

  insert(child) {
    const childNode = new FamilyTree(child);
    this.children.push(childNode);
  }
}

// const squarepants = new FamilyTree('Spongebob');
// squarepants.insert('Patrick');
// squarepants.insert('Squidward');

// const star = squarepants.findMember('Patrick');
// star.insert('Sandy');
// star.insert('Gary');

// const cheeks = star.findMember('Sandy');
// cheeks.insert('Mrs. Puff');

// const tentacles = squarepants.findMember('Squidward');
// tentacles.insert('Mr. Krabs');

// console.log(squarepants.log());

module.exports = FamilyTree;
