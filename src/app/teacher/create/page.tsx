'use client'

import { SideBar } from "@/components/SideBar";
import usePress from "@/lib/react-dynamic-component/CustomHooks";
import FluidContext from "@/lib/react-dynamic-component/FluidContext";
import { getUserName } from "@/lib/user/user";
import {Type, Image, Circle, Square, Atom, Video, AppWindow, PlusCircle, MinusCircle, ChevronLeft, ChevronRight, UploadCloud} from 'lucide-react'
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function TeacherCreateContent() {

    const searchParams = useSearchParams();

    const [value, setValue] = usePress();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pages, setPages] = useState<ReactNode[] | any>([<FluidContext style={'w-1/2 h-screen select-none self-center bg-white'} key={Math.random()} addButton={value} />]);
    
    const [contentSave, setContentSave] = useState<any[]>([]);
    const [currentPageToSave, setCurrentPageToSave] = useState<number>(0);
    const [currentIDtoSave, setCurrentIDtoSave] = useState<string>();
    const [canSave, setCanSave] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [contentLoaded, setContentLoaded] = useState<any>();

    //ID do professor atualmente dentro do conteudo
    const [currentID, setCurrentID] = useState<number>(54321);
    //ID do professor criador do conteudo
    const [teacherID, setTeacherID] = useState<number>((searchParams.get("teacherID") == undefined) ? currentID : Number(searchParams.get("teacherID")));
    const [contentID] = useState<number>((searchParams.get("contentID") == undefined) ? -1 : Number(searchParams.get("contentID")))

    function upload(){
      if(contentID != -1){
        fetch(`http://localhost:3333/contents/${teacherID}/${contentID}`)
        .then(json => json.json())
        .then(data => {
          setContentLoaded(data);
        })
      }
    }

    function getUser(){
      getUserName().then(resp => {

      const type = (resp.type == "0") ? "student" : (resp.type == "1") ? "teacher" : "instituition"

      fetch(`http://localhost:3333/${type}/${resp.id}`)
      .then(json => json.json())
      .then(data => {
        setCurrentID(data.teacherID)
        if(searchParams.get("teacherID") == undefined){
          setTeacherID(data.teacherID)
        }
        else{
          upload()
        }
      })

    });
    }

    function addNewPage(){
      const key = Math.random();
      setPages([...pages, <FluidContext currentSave={currentIDtoSave} onlyCopy={!(currentID == teacherID)} id={key+""} linkedToPage={currentPage} getSavedPage={getObject} style={'w-1/2 h-screen select-none self-center bg-white'} active={true} key={key} addButton={value} />])
      setTimeout(() => {
        setCurrentPage(currentPage+1)
      }, 1000)
    }
    
    function removePage(){
      
      if(currentPage != 0){
        var allPages : any = pages;
  
        allPages = allPages.map((context : ReactNode, index : number) => {
          if(index != currentPage)
            return context
        }).filter((element : ReactNode) => {return element !== undefined})
  
        setPages(allPages)
        setCurrentPage(currentPage-1)
      }
      else if(currentPage == 0 && pages.length > 1){
        var allPages : any = pages;

        delete allPages[0];
        
        allPages = allPages.filter((element : ReactNode) => {return element !== null})
  
        setPages(allPages)
      }

    }

    function getObject(obj: any, link : number){
      
      let newPage = contentSave.map(c => {
        return c;
      });

      const uniqueArray = obj.filter((item: any, index: number) => {
          return obj.findIndex((i : any) => i?.key === item?.key) === index;
      });
      
      newPage[link] = {
        page: link,
        data: uniqueArray
      }

      newPage = newPage.map((item, index) => {
        if(index < pages.length)
          return item;
      }).filter(i => i !== undefined);
      
      setContentSave(newPage);
    }
    
    function resetSaveds(){
      //Seta a primeira página novamente
      setCurrentPageToSave(0);
    }

    function saveContent(){
      if(name == "" && description == ""){
        alert("Insira um nome e descrição para o conteúdo!")
      }
      else{
        fetch("http://localhost:3333/createContent", {
          method: "POST",
          body: JSON.stringify(
            {
              idTeacher: currentID+"",
              contentName: name,
              contentDescription: description,
              content: JSON.stringify(contentSave),
            }
            ),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(res => {
          alert("Conteúdo salvo com sucesso!")
        })
      }
    }

    useEffect(() => {
      try{
        getUser();
      }
      catch{}
      setTimeout(() => {
        setCanSave(true);
      }, 4000)
    }, [])

    useEffect(() => {
      //Indica qual página que será salva inicialmente
      setCurrentIDtoSave(pages[currentPageToSave]?.key);
    }, [currentPageToSave])

    useEffect(() => {
      //Solicita a página atual que salve seu conteúdo
      setValue("savePage");
    }, [currentIDtoSave])
    
    useEffect(() => {
      //Ao terminar o processo, passa para a próxima tela.
      if(currentPageToSave == pages.length-1 && canSave)
        saveContent();
      
      setCurrentPageToSave(currentPageToSave+1);
    }, [contentSave])

    useEffect(() => {
      //Quando o conteúdo for carregado do servidor
      if(contentLoaded != undefined){
        setName(contentLoaded.contents.contentName);
        setDescription(contentLoaded.contents.contentDescription);

        const content = JSON.parse(contentLoaded.contents.content);
  
        let componentsToAdd = content.map((p: any) => {
          const key = Math.random();
          return <FluidContext currentSave={currentIDtoSave} onlyCopy={!(currentID == teacherID)} toUpload={p.data} id={key+""} linkedToPage={p.page} getSavedPage={getObject} style={`w-1/2 h-screen select-none self-center bg-white ${(p.page == currentPage) ? "flex flex-col" : "hidden"}`} active={(p.page == currentPage) ? true : false} key={key} addButton={value} />
        })
  
        setPages(componentsToAdd);
      }

    }, [contentLoaded])

    useEffect(() => {
      var pagesNew : any = pages;
      pagesNew = pagesNew.map((context: any, index: number) => {
        if(index == currentPage){
          return <FluidContext currentSave={currentIDtoSave} id={context.key} linkedToPage={index} getSavedPage={getObject} style={'w-1/2 h-screen select-none self-center bg-white flex flex-col'} active={true} key={context.key} addButton={value} />
        }
        else{
          return <FluidContext currentSave={currentIDtoSave} id={context.key} linkedToPage={index} getSavedPage={getObject} style={'w-1/2 h-screen select-none self-center bg-white hidden'} active={false} key={context.key} addButton={value} />
        }
      })

      setPages(pagesNew)
    }, [value, currentPage])

    return (
      <main className="h-screen overflow-auto w-full flex flex-col bg-cinza">

        <div className="absolute flex flex-col p-4 bg-blue-100 rounded-xl gap-4 mt-2 w-1/4">
          {(teacherID == currentID) ? <input spellCheck={false} value={name} onChange={(e) => {setName(e.target.value)}} type="text" name="" id="" placeholder="Nome do conteúdo" className="p-2" /> : <p>{name}</p>}
          {(teacherID == currentID) ? <textarea spellCheck={false} value={description} onChange={(e) => {setDescription(e.target.value)}} name="" id="" cols={30} rows={5} placeholder="Descrição do conteúdo" className="resize-none p-2" ></textarea> : <p>{description}</p>}
        </div>

        {
          pages.map((context : ReactNode) => {
            return context
          })
        }

        <div className="flex flex-row bg-cinza w-fit p-2 px-4 absolute bottom-4 rounded-xl items-center justify-center gap-4">
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {(currentPage > 0) && setCurrentPage(currentPage-1)}}><ChevronLeft size={32} color="white" /></button>
          {(teacherID == currentID) && <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {addNewPage()}}><PlusCircle size={32} color="white" /></button>}
          <p className="text-2xl text-azul">{currentPage+1}</p>
          {(teacherID == currentID) && <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {removePage()}}><MinusCircle size={32} color="white" /></button>}
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {(currentPage < pages.length-1) && setCurrentPage(currentPage+1)}}><ChevronRight size={32} color="white" /></button>
        </div>

        {
          (teacherID == currentID) &&
          <div className="flex flex-row bg-cinza w-fit p-2 px-4 absolute bottom-4 self-center rounded-xl justify-center gap-4 opacity-30 duration-500 transition-opacity hover:opacity-100">
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("text")}><Type size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("image")}><Image size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("circle")}><Circle size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("square")}><Square size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("video")}><Video size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("paint")}><AppWindow size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("transform")}><Atom size={32} color="white" /></button>
            <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {resetSaveds()}}><UploadCloud size={32} color="white" /></button>
          </div>
        }

        <SideBar type="professor" />
      </main>
    )
  }
  