import { MonacoEditor } from "./monaco";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

import { Select } from "@strawberry-graphql/styleguide/dist/components/form/select";
import { Logo } from "@strawberry-graphql/styleguide/dist/components/logo/logo";
import { Button } from "@strawberry-graphql/styleguide/dist/components/button/button";
import { GithubCircleIcon } from "@strawberry-graphql/styleguide/dist/components/icons/github";

const defaultSource = `
import strawberry

@strawberry.type
class User:
    name: str
    age: int

@strawberry.type
class Query:
    @strawberry.field
    def user(self) -> User:
        return User(name="Patrick", age=100)

schema = strawberry.Schema(query=Query)
`.trim();

const defaultQuery = `
{
    user {
      name
      age
    }
}
`.trim();

export const Editor = () => {
  return (
    <main className="h-screen w-screen flex flex-col">
      <header className="flex px-12 md:px-16 py-12 border-b-2 border-strawberry">
        <Logo className="h-[52px] mr-auto" />

        <div className="flex space-x-12 items-center">
          <Select options={[]} placeholder="Version" />

          <Button
            onClick={() => {
              console.log("clicked");
            }}
            as="button"
          >
            Share
          </Button>
          <div>
            <GithubCircleIcon />
          </div>
          <div>Home</div>
        </div>
      </header>

      {/* <MonacoThemes /> */}

      <div className="relative flex-1">
        <PanelGroup direction="horizontal">
          <Panel minSize={20}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={20} minSize={20}>
                <MonacoEditor
                  title="schema.py"
                  source={defaultSource}
                  language="python"
                  onChange={() => {}}
                />
              </Panel>
              <PanelResizeHandle className="h-2 bg-strawberry" />
              <Panel minSize={30}>
                <MonacoEditor
                  title="query.graphql"
                  source={defaultQuery}
                  language="graphql"
                  onChange={() => {}}
                />
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="w-2 bg-strawberry" />
          <Panel defaultSize={20} minSize={20}>
            <MonacoEditor
              title="result"
              source={`{ "someData": "Here" }`}
              language="json"
              onChange={() => {}}
            />
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
};
