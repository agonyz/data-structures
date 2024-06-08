class Node {
  children: { [key: string]: Node } = {};
  isEndOfWord: boolean = false;
}

class Trie {
  root: Node = new Node();

  insert(word: string) {
    let current = this.root;
    [...word].forEach((c) => {
      if (!current.children[c]) {
        current.children[c] = new Node();
      }
      // updates current to point to the child node corresponding to the character
      current = current.children[c];
    });
    current.isEndOfWord = true;
  }

  getShortestRoot(word: string): string {
    let current = this.root;
    let prefix = '';

    // can't use forEach() because we need an early exit condition
    for (const c of word) {
      if (current.isEndOfWord) {
        return prefix;
      }
      if (!current.children[c]) {
        return word;
      }

      prefix = prefix + c;
      current = current.children[c];
    }

    return prefix;
  }
}

function replaceWords(dictionary: string[], sentence: string): string {
  const trie = new Trie();
  const result: string[] = [];
  dictionary.forEach((word) => {
    trie.insert(word);
  });

  sentence.split(' ').forEach((word) => {
    result.push(trie.getShortestRoot(word));
  });

  return result.join(' ');
}

console.log(
  replaceWords(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery'),
);

// should return: 'the cat was rat by the bat'
// challenge from: https://leetcode.com/problems/replace-words/description/
