'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { buildSearchURL, cn, Q_PARAM } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SearchButtonFormProps = Readonly<Omit<React.ComponentProps<'form'>, 'onSubmit'> & { q: string }>;

const SearchForm: React.FC<SearchButtonFormProps> = ({ q, className, ...props }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const formSchema = z.object({
    [Q_PARAM]: z.string({ required_error: '검색 문자열을 입력하세요.' }), //.min(3, '3글자 이상 입력해주세요.'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { q },
  });

  useEffect(() => {
    form.setValue(Q_PARAM, q);
  }, [q, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSearching) return;

    setIsSearching(true);
    router.push(buildSearchURL(searchParams, { q: values.q }));
    setIsSearching(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, 'rounded-xl px-12 py-8 mx-2 mt-4 mb-8  bg-secondary')}
        {...props}
      >
        <FormField
          control={form.control}
          name={Q_PARAM}
          render={({ field }) => (
            <FormItem>
              <div className="flex border border-muted-foreground bg-background focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
                <FormControl>
                  <Input
                    type="search"
                    placeholder="Search"
                    className="rounded-none border-none flex-grow focus-visible:ring-0 focus-visible:ring-ring"
                    {...field}
                  />
                </FormControl>
                <Button type="submit" variant="ghost" size="icon" className="rounded-none m-0">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Collapsible defaultOpen={true}>
          <CollapsibleTrigger className="flex gap-x-1 items-center mt-2 ml-2">
            <Icons.filter /> Advanced filter
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">새</CollapsibleContent>
        </Collapsible>
      </form>
    </Form>
  );
};
SearchForm.displayName = 'SearchForm';

export { SearchForm };
