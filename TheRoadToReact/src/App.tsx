
import {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import './App.css'
import ReducerComponent from './HowToUseReducerInReact';
import StateReactHooks from './ReactStateHoos/StateReactHooks';

type Story = {
  objectId: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

type Stories = Story[];

const initialStories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectId: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov,Andrew Clark",
    num_comments: 2,
    points: 5,
    objectId: 1
  }
]

const getAsyncStories = (): Promise<{ data: { stories: Stories } }> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } })
      , 2000
    ))


type StoriesState = Stories;

type StoriesSetAction = {
  type: "SET_STORIES";
  payload: Stories
}

type StoriesRemoveAction = {
  type: "REMOVE_STORY";
  payload: Story
}

type StoriesAction = StoriesSetAction | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  switch (action.type) {
    case "SET_STORIES":
      return action.payload;
    case "REMOVE_STORY":
      return state.filter(
        (story: Story) => action.payload.objectId !== story.objectId
      );
    default:
      throw new Error();
  }
}

const useStorageState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

function App() {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React")

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "SET_STORIES",
          payload: result.data.stories
        });
        setIsLoading(false)
      })
      .catch(() => setIsError(true))
  }, [])

  const handlerRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    })
  };

  const handlerSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story: Story) =>
    story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

  return (
    <div>
      <StateReactHooks />
      <ReducerComponent />

      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handlerSearch} >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {
        isLoading
          ? (<p>Loading... </p>)
          : (
            <List
              list={searchedStories}
              onRemoveItem={handlerRemoveStory} />)
      }
    </div>
  );
};

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isFocused: boolean;
  children: ReactNode
};

const InputWithLabel: FC<InputWithLabelProps> = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

const List: FC<ListProps> = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectId}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
};

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
}

const Item: FC<ItemProps> = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        DisMiss
      </button>
    </span>
  </li>
)

export default App
