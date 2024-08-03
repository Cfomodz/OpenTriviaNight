import { Button, ButtonGroup, Label, Table } from "flowbite-react";
import { Question } from "../../Models";
import GenerateFromOpenTDB from "./GenerateFromOpenTDB";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import GenerateFromTriviaApi from "./GenerateFromTriviaApi";

type Props = {
  onAdd: (category: string, questions: Question[]) => void;
}

export default function GenerateCategory({ onAdd }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [category, setCategory] = useState<string>("");
  const [source, setSource] = useState<"openTriviaDb" | "theTriviaApi">("openTriviaDb");

  const updateQuestions = (category: string, questions: Question[]) => {
    setCategory(category);
    setQuestions(questions);
  }

  const finalize = () => onAdd(category, questions);

  return (
    <div>
      <div className="flex flex-col mb-2">
        <Label value="Question Source" />

        <ButtonGroup>
          <Button className="grow" color={source == "openTriviaDb" ? "blue" : "gray"} onClick={() => setSource("openTriviaDb")}>Open Trivia DB</Button>
          <Button className="grow" color={source == "theTriviaApi" ? "blue" : "light"} onClick={() => setSource("theTriviaApi")}>The Trivia API</Button>
        </ButtonGroup>
      </div>
      {source === "openTriviaDb"
        ? <GenerateFromOpenTDB updateQuestions={updateQuestions} />
        : source === "theTriviaApi"
          ? <GenerateFromTriviaApi updateQuestions={updateQuestions} />
          : <></>
      }

      {questions.length > 0
        ? <Table className="my-4" striped>
          <Table.Head>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Correct Answer</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {questions.map(q => {
              return <Table.Row>
                <Table.Cell className="py-2">{q.detail}</Table.Cell>
                <Table.Cell className="py-2">{q.correctAnswer}</Table.Cell>
              </Table.Row>
            })}
          </Table.Body>
        </Table>
        : <></>}

      {questions.length > 0
        ? <Button className="mt-4" type="button" color="success" onClick={finalize}><HiCheck className="h-5 mr-2" />Use these Questions</Button>
        : <></>}

      <div className="text-xs mt-4 text-base leading-relaxed text-gray-400">
        <span>
          These questions are generated using the <a className="hover:underline text-sky-400" href="https://opentdb.com" target="_blank" rel="noopener noreferrer">Open Trivia Database</a> and <a className="hover:underline text-sky-400" href="https://the-trivia-api.com" target="_blank" rel="noopener noreferrer">The Trivia API</a>. Huge thanks to these two services for provided an amazing source of questions.
        </span>
      </div>
    </div>
  )
}