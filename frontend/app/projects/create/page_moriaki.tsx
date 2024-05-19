"use client"

import React, { useState } from 'react';
import createProject from './createProject';
import { Form, Input, TextArea, Select, Button } from './FormStyles';

const Page = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectDetailBackground, setProjectDetailBackground] = useState('');
  const [projectDetailContext, setProjectDetailContext] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ
    try {
      const response = await createProject({
        project_title: projectTitle,
        project_category: projectCategory,
        project_detail_background: projectDetailBackground,
        project_detail_context: projectDetailContext
      });
      const data = await response.json(); // レスポンスのJSONを解析
      if (response.ok) {
        console.log('Project created:', data);
        alert(`プロジェクトが正常に作成されました!プロジェクトID: ${data.project_id}`);
      } else {
        throw new Error(data.message || "未知のエラーが発生しました。");
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert(`プロジェクトの作成に失敗しました: ${error.message}`);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        案件タイトル:
        <Input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      </label>
      <label>
        相談分類:
        <Select value={projectCategory} onChange={(e) => setProjectCategory(e.target.value)}>
          <option value="">選択してください</option>
          <option value="研究分野のヒアリング">研究分野のヒアリング</option>
          <option value="アドバイス・業務改善の相談（壁打ち程度）">アドバイス・業務改善の相談（壁打ち程度）</option>
          <option value="コンサルティング・共同研究の相談">コンサルティング・共同研究の相談</option>
        </Select>
      </label>
      <label>
        依頼背景:
        <TextArea
          value={projectDetailBackground}
          onChange={(e) => setProjectDetailBackground(e.target.value)}
        />
      </label>
      <label>
        相談内容:
        <TextArea
          value={projectDetailContext}
          onChange={(e) => setProjectDetailContext(e.target.value)}
        />
      </label>
      <Button type="submit">登録</Button>
    </Form>
  );
};

export default Page;

/* 
import React, { useState } from 'react';
import createProject from './createProject'; // 関数のインポートを確認してください

const Page = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectDetailBackground, setProjectDetailBackground] = useState('');
  const [projectDetailContext, setProjectDetailContext] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ
    try {
      const response = await createProject({
        project_title: projectTitle,
        project_category: projectCategory,
        project_detail_background: projectDetailBackground,
        project_detail_context: projectDetailContext
      });
      console.log('Project created:', response);
      alert('プロジェクトが正常に作成されました！');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('プロジェクトの作成に失敗しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          案件タイトル:
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          相談分類:
          <select value={projectCategory} onChange={(e) => setProjectCategory(e.target.value)}>
            <option value="">選択してください</option>
            <option value="研究分野のヒアリング">研究分野のヒアリング</option>
            <option value="アドバイス・業務改善の相談（壁打ち程度）">アドバイス・業務改善の相談（壁打ち程度）</option>
            <option value="コンサルティング・共同研究の相談">コンサルティング・共同研究の相談</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          依頼背景:
          <textarea
            value={projectDetailBackground}
            onChange={(e) => setProjectDetailBackground(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          相談内容:
          <textarea
            value={projectDetailContext}
            onChange={(e) => setProjectDetailContext(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">登録</button>
      </div>
    </form>
  );
};

export default Page; */

/* import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">依頼内容</h3>
        <p className="text-sm text-muted-foreground">
          研究者に依頼したい内容をご記入ください
        </p>
      </div>
      <Separator />
      <ProfileForm/>
    </div>
  )
} */
/* 

import React, { useState } from 'react';
import createProject from './createProject'; // 適切なパスでインポートしてください

const CreateProjectPage = () => {
  const [projectCategory, setProjectCategory] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetailBackground, setProjectDetailBackground] = useState('');
  const [projectDetailContext, setProjectDetailContext] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // ページのリロードを防ぐ
    try {
      const response = await createProject({
        project_category: projectCategory,
        project_title: projectTitle,
        project_detail_background: projectDetailBackground,
        project_detail_context: projectDetailContext,
      });
      console.log(response); // 応答を確認
      setMessage("送信できました"); // 成功時のメッセージ
    } catch (error) {
      console.error(error); // エラーをログ
      setMessage("エラーが発生しています"); // エラー時のメッセージ
    }
    alert(message); // ポップアップでメッセージを表示
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Category:
        <input
          type="text"
          value={projectCategory}
          onChange={(e) => setProjectCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        Project Title:
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Project Detail Background:
        <textarea
          value={projectDetailBackground}
          onChange={(e) => setProjectDetailBackground(e.target.value)}
        />
      </label>
      <br />
      <label>
        Project Detail Context:
        <textarea
          value={projectDetailContext}
          onChange={(e) => setProjectDetailContext(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProjectPage; */
/* 
import React, { useState } from 'react';
import createProject from './createProject'; // 適切なパスでインポートしてください

const CreateProjectPage = () => {
  const [projectCategory, setProjectCategory] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetailBackground, setProjectDetailBackground] = useState('');
  const [projectDetailContext, setProjectDetailContext] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createProject({
        project_category: projectCategory,
        project_title: projectTitle,
        project_detail_background: projectDetailBackground,
        project_detail_context: projectDetailContext,
      });
      console.log(response);
      setMessage("送信できました");
    } catch (error) {
      console.error(error);
      setMessage("エラーが発生しています");
    }
    alert(message);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          Project Category:
          <input
            type="text"
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          Project Title:
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          Project Detail Background:
          <textarea
            value={projectDetailBackground}
            onChange={(e) => setProjectDetailBackground(e.target.value)}
            style={{ height: '100px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          Project Detail Context:
          <textarea
            value={projectDetailContext}
            onChange={(e) => setProjectDetailContext(e.target.value)}
            style={{ height: '100px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
 */