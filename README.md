### Challenges:
I challenged myself to build a whole quiz logic inside **1** component (src/components/Quiz.jsx). 
Inside the file "Quiz.jsx", you will find:
- API calls (axios)
- function that generate non-repeated number
- algorithm that check which choice is clicked & if it is a correct answer.

### What I learned:
I got to practiced with React Hooks (useState & useEffect), JavaScript array methods(map, forEach, etc...), and how to write more with less lines of code. For example, in **setCurrentQuiz** function inside of **handleChoiceClick()**, I managed to check if the "id" matches any of the nested element in the key "choices (array)" using 2 **map** inside a callback function.

```bash
setCurrentQuiz((prev) =>
      prev.map((i) => {
        return {
          ...i,
          choices: i.choices.map((j) => {
            return id === j.id ? { ...j, chosen: true } : j;
          }),
        };
      })
    );
 ```



