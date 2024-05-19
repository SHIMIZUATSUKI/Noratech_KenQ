from sqlalchemy import create_engine, Column, String, Integer, ForeignKey,Float, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship

# declarative base インスタンスを生成
Base = declarative_base()

class Clients(Base):
    __tablename__ = 'clients'
    client_id = Column(Integer, primary_key=True, autoincrement=True) 
    client_name = Column(String)
    
class Researchers(Base):
    __tablename__ = 'researchers'
    researcher_id = Column(Integer, primary_key=True)
    researcher_name = Column(String)
    affiliated_organization = Column(String)
    position = Column(String)
    research_information_url= Column(String)
    
class Researcher_fields(Base):
    __tablename__ = 'researcher_fields'
    field_id = Column(Integer, primary_key=True,autoincrement=True)
    reseach_field = Column(String)
    researcher_id = Column(Integer, ForeignKey('researchers.researcher_id'))
    
    
class Researcher_keywords(Base):
    __tablename__ = 'researcher_keywords'
    keyword_id = Column(Integer, primary_key=True, autoincrement=True)
    achievement_keyword = Column(String)
    researcher_id = Column(String, ForeignKey('researchers.researcher_id'))

class Projects(Base):
    __tablename__ = 'projects'
    project_id = Column(Integer, primary_key=True, autoincrement=True)
    project_title = Column(String)
    project_category = Column(String)
    project_detail_background = Column(String)
    project_detail_context = Column(String)
    project_proposal_contents = Column(String)
    project_proposal_researcher = Column(String)
    research_field_major_classification = Column(String)
    research_field_subclassification = Column(String)
    client_goal_category = Column(String)
    client_industry = Column(String)
    consultation_method = Column(String)
    time_required = Column(Integer)
    reward_fee = Column(Integer)
    deadline_date = Column(String)
    release = Column(String)
       
class Matchings(Base):
    __tablename__ = 'matchings'
    matching_id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey('projects.project_id'))
    researcher_id = Column(Integer, ForeignKey('projects.project_id'))
    matching_score = Column(Float)
    matching_status = Column(Integer)
    researcher_proposal = Column(String)