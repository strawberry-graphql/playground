import { MonacoEditor } from "./monaco";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

import { Select } from "@strawberry-graphql/styleguide/dist/components/form/select";
import { Logo } from "@strawberry-graphql/styleguide/dist/components/logo/logo";
import { Button } from "@strawberry-graphql/styleguide/dist/components/button/button";

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
      <header className="flex px-16 md:px-40 py-16">
        <Logo className="h-[52px] mr-auto" />

        <Select options={[]} placeholder="Version" />

        <Button
          onClick={() => {
            console.log("clicked");
          }}
          as="button"
        >
          Share
        </Button>
        <div>Github</div>
        <div>Home</div>
      </header>

      {/* <MonacoThemes /> */}

      <div className="relative flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={20}>
            <MonacoEditor
              source={defaultSource}
              language="python"
              onChange={() => {}}
            />
          </Panel>
          <PanelResizeHandle className="w-2 bg-blue-800" />
          <Panel minSize={30}>
            <MonacoEditor
              source={defaultQuery}
              language="graphql"
              onChange={() => {}}
            />
          </Panel>
          <PanelResizeHandle className="w-2 bg-blue-800" />
          <Panel defaultSize={20} minSize={20}>
            right
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
};
