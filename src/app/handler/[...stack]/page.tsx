import { stackServerApp } from "@/stack";
import { StackHandler } from "@stackframe/stack";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function Handler(props: any) {
	return <StackHandler fullPage app={stackServerApp} {...props} />;
}
